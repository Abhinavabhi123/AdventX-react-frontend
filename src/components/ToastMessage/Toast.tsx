import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const success =()=>{
    
        toast.success('Success Notification !', {
            position: toast.POSITION.TOP_RIGHT
        });
    
}