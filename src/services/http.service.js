import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

//  адрес по-умолчанию
axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(
    res => {
        // toast.info("Данные успешно изменены!")
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            toast.error(`Error`);
            console.log(error);
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
