import { toast } from 'react-toastify';

interface ErrorData {
  message: any;
  name: string;
  status: number;
}

interface ToastData {
  error: ErrorData;
  closeButton?: boolean;
  autoClose?: number;
}

interface ToastConfig {
  toastId: string;
  closeButton: boolean;
  autoClose: number;
}

const handleErrorByToast = ({ error, closeButton = true, autoClose = 2000 }: ToastData) => {
  const toastConfig: ToastConfig = { toastId: 'api_error', closeButton, autoClose };
  toast.error(
    `[${error?.name}]  
  status: ${error.status}, 
  message: ${error?.message}`,
    {
      ...toastConfig,
    },
  );
};

export default handleErrorByToast;
