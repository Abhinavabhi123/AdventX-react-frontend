import { toast } from 'react-hot-toast';

export const showSuccessToast = (message:string) => {
    toast(message, {
      duration: 3000,
      position: 'top-center',
      icon: '🎉',
      style: {
        background: '#4caf50',
        color: '#fff',
      },
    });
  };

  export const showErrorToast = (message:string) => {
    toast(message, {
      duration: 3000,
      position: 'top-center',
      icon: '❌',
      style: {
        background: '#FF4E4EBD',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff', 
        secondary: '#fff',
      },
    });
  };