import { toast } from 'react-toastify';

const defaultConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showToast = {
  success: (message) => {
    toast.success(message, {
      ...defaultConfig,
      className: 'bg-green-50',
    });
  },
  error: (message) => {
    toast.error(message, {
      ...defaultConfig,
      className: 'bg-red-50',
    });
  },
  warning: (message) => {
    toast.warning(message, {
      ...defaultConfig,
      className: 'bg-yellow-50',
    });
  },
  info: (message) => {
    toast.info(message, {
      ...defaultConfig,
      className: 'bg-blue-50',
    });
  },
}; 