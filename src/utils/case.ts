import Case from 'case';

export type CaseType = 'camel' | 'snake' | 'pascal' | 'kebab';

export const CASES = {
  CAMEL: 'camel' as const,
  SNAKE: 'snake' as const,
  PASCAL: 'pascal' as const,
  KEBAB: 'kebab' as const,
};

const caseMap = {
  [CASES.CAMEL]: Case.camel,
  [CASES.SNAKE]: Case.snake,
  [CASES.PASCAL]: Case.pascal,
  [CASES.KEBAB]: Case.kebab,
};

export function transformKeys(data: any, caseType: CaseType): any {
  if (Array.isArray(data)) {
    return data.map((item) => transformKeys(item, caseType));
  }

  if (
    data !== null &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    return Object.keys(data).reduce(
      (acc, key) => ({
        ...acc,
        [caseMap[caseType](key)]: transformKeys(data[key], caseType),
      }),
      {},
    );
  }

  return data;
}
