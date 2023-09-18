import {toast} from 'react-toastify'

const displayToast = {
    info(text,time=3000){
            toast.info(text, {
                position: "bottom-left",
                autoClose: time,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                })
    },
    warning(text,time=3000){
        {
            toast.warn(text, {
                position: "bottom-left",
                autoClose: time,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    },
    success(text,time=3000){
        {
            toast.success(text, {
                position: "bottom-left",
                autoClose: time,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    },
    error(text,time=3000){
        {
            toast.error(text, {
                position: "bottom-left",
                autoClose: time,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    },
    default(text,time=3000){
        {
            toast(text, {
                position: "bottom-left",
                autoClose: time,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }
}

export default displayToast


