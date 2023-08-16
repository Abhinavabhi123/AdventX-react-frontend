import { toast } from 'react-hot-toast';

export const showSuccessToast = (message:string) => {
    toast(message, {
      duration: 3000,
      position: 'top-center',
      icon: '🎉',
      style: {
        background: '#51C35B',
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
  export const styledToast=(message:string)=>{
    toast.success(message, {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
  }