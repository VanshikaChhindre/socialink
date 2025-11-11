import {toast} from "react-toastify"

//utitlity file for toast notifactions like signup successfull

export const handleSuccess = (message) => {
    toast.success(message)
}

export const handleError = (message) => {
    toast.error(message)
}