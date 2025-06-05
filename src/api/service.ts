import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { format } from 'date-fns';
import flow from 'lodash/fp/flow';
import isPlainObject from 'lodash/fp/isPlainObject';
import isUndefined from 'lodash/fp/isUndefined';
import mapValues from 'lodash/fp/mapValues';
import omitBy from 'lodash/fp/omitBy';

// Libs
import { CASES, transformKeys } from '@/utils/case';
import toPredicateValues from '@/utils/to-predicate-values';

// Constants
import { envConfigs } from '@/constants/config';
import { STORAGE_DATA } from '@/constants/storageData';
import handleErrorByToast from '@/utils/handleErrorByToast';

// Types
interface PaginationData<T> {
  count: number;
  list: T[];
  page: number;
  pagingIndex: number;
  pagingSize: number;
  requestDate: string | Date;
}

interface ApiError {
  status: number;
  code?: string;
  message?: string;
  data?: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Predicator = (value: any) => any;

type TNormalizer<T = unknown> = (response: T) => T;

interface IServicePrototype<TResponse = unknown, TRequest = unknown> {
  normalizer: TNormalizer<TResponse>;
  denormalizer: TNormalizer<TRequest>;
}

interface IConfig {
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
  url: string;
  method: Method;
}

class Service<TResponse = unknown, TRequest = unknown>
  implements IServicePrototype<TResponse, TRequest>
{
  name: string;
  config: AxiosRequestConfig & Partial<IConfig>;
  normalizer: TNormalizer<TResponse>;
  denormalizer: TNormalizer<TRequest>;
  withAccessToken: boolean;

  constructor() {
    this.config = {
      url: '',
      method: 'get',
      params: {},
    };
    this.name = 'SERVICE_NAME';
    this.normalizer = ((response) => response) as TNormalizer<TResponse>;
    this.denormalizer = ((request) => request) as TNormalizer<TRequest>;
    this.withAccessToken = true;
  }

  static normalizeList<T>(list: T[], normalizer: TNormalizer<T>): T[] {
    return [...(list || [])].map((item) => normalizer(item));
  }

  static normalizePayloadWithPagination<T>(
    data: PaginationData<T>,
    normalizer: TNormalizer<T>,
  ): PaginationData<T> & { requestDateTime: string | Date } {
    return {
      count: data.count,
      list: this.normalizeList(data.list, normalizer),
      page: data.page,
      pagingIndex: data.pagingIndex,
      pagingSize: data.pagingSize,
      requestDate: data.requestDate,
      requestDateTime: data.requestDate,
    };
  }

  showLogger<T>(action: string, response: T): void {
    const responseStyle = 'font-weight: bold; color: #B5B5B5;';
    console.groupCollapsed(`api status: ${action}`);
    console.log('%c response', responseStyle, response);
    console.groupEnd();
  }

  getOption() {
    return {
      toResponseCase: CASES.CAMEL,
      toRequestCase: CASES.CAMEL,
    };
  }

  getApiConfig() {
    return {
      baseURL: envConfigs.apiUrl,
      headers: {},
    };
  }

  getAccessToken() {
    if (typeof window === 'undefined') return {};
    const tokenFromLocalStorage = window.localStorage.getItem(STORAGE_DATA.TOKEN);
    if (tokenFromLocalStorage) {
      return tokenFromLocalStorage;
    }
  }

  getAxiosInstance(): AxiosInstance {
    const apiConfig = this.withAccessToken
      ? Object.assign(this.getApiConfig(), {
          headers: {
            Authorization: this.getAccessToken() && `Bearer ${this.getAccessToken()}`,
            ...this.getApiConfig().headers,
          },
        })
      : this.config;

    const axiosInstance = axios.create(apiConfig);

    axiosInstance.interceptors.request.use(
      (config) => {
        if (typeof window === 'undefined') return config;

        const params = config.params || {};

        const search = window.location.search;
        const searchParams = new URLSearchParams(search);

        const cache = searchParams.get('cache');

        if (cache) params.cache = cache;

        config.params = params;

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return axiosInstance;
  }

  getRequestConfig(): AxiosRequestConfig & Partial<IConfig> {
    const { params, data, ...restConfig } = this.config;
    const requestConfig: AxiosRequestConfig & Partial<IConfig> = { ...restConfig };

    if (isPlainObject(params)) {
      requestConfig.params = this.handleParameter(params);
    }

    if (isPlainObject(data)) {
      requestConfig.data = this.handleParameter(data);
    }

    if (
      requestConfig.headers &&
      isPlainObject(requestConfig.headers) &&
      requestConfig.headers['content-type'] === 'multipart/form-data'
    ) {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => formData.append(key, val));
        } else {
          formData.append(key, value as Blob);
        }
      });
      requestConfig.data = formData;
    }

    return requestConfig;
  }

  debug(reason: any) {
    const { url } = this.config;
    const { message } = reason;

    console.warn(
      `${url} \n - status: ${reason?.status ?? reason.code} \n - message: ${message}\n\n`,
      reason,
    );
  }

  handleParameter<T extends Record<string, unknown> & TRequest>(parameter: T): T {
    const denormalizedParameter = this.denormalizer(parameter);
    const casedParameter = transformKeys(denormalizedParameter, this.getOption().toRequestCase);

    const predicator: Predicator = (object) => {
      if (Array.isArray(object)) {
        return object.filter((value) => !isUndefined(value));
      }
      return flow(
        omitBy(isUndefined),
        mapValues((value) => (typeof value === 'string' ? value.trim() : value)),
      )(object);
    };

    const predicatedParameter = toPredicateValues(casedParameter, predicator);

    return predicatedParameter;
  }

  handleResponse(response: AxiosResponse): TResponse {
    const isRequestSuccess = response.status >= 200 && response.status < 300;

    if (isRequestSuccess) {
      const casedData = transformKeys(response.data, this.getOption().toResponseCase);

      if (casedData.data) {
        return this.handleSuccess(casedData.data);
      } else {
        return this.handleSuccess(casedData);
      }
    } else {
      return this.handleError({ status: response.status });
    }
  }

  showSuccessLogger<T>(data: T): T {
    this.showLogger(`${this.name}_SUCCESS`, data);
    return data;
  }

  handleSuccess(casedData: unknown): TResponse {
    const normalizedData = this.normalizer(casedData as TResponse);

    const predicator: Predicator = (object) => {
      if (Array.isArray(object)) {
        return object.filter((value) => !isUndefined(value));
      }
      return flow(
        omitBy(isUndefined),
        mapValues((value) => (typeof value === 'string' ? value.trim() : value)),
      )(object);
    };

    const predicatedData = toPredicateValues(normalizedData, predicator);

    return predicatedData as TResponse;
  }

  handleError(error: ApiError): never {
    this.showLogger(`${this.name}_FAILURE`, error);
    throw {
      isResponseError: true,
      errorData: error.data,
    };
  }

  async handleFailure(error: AxiosError): Promise<never> {
    const isAuthError = error.status === 401;
    const errorData = {
      name: this.name,
      status: error.status || 500,
      message: isAuthError ? 'Unauthorized' : JSON.stringify(error.message),
    };
    handleErrorByToast({ error: errorData });

    throw errorData;
  }

  async callApi(): Promise<TResponse> {
    const axiosInstance = this.getAxiosInstance();
    const requestConfig = this.getRequestConfig();

    this.showLogger(`${this.name}_REQUEST`, format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    console.log(requestConfig);
    return axiosInstance(requestConfig)
      .then((response) => this.handleResponse(response))
      .catch((error) => this.handleFailure(error));
  }
}

export default Service;

export function getCallApiFunction<TResponse = unknown, TRequest = unknown>(
  ApiService: Service<TResponse, TRequest>,
): Promise<TResponse> {
  return ApiService.callApi();
}
