import axios from "axios";
import { BASE_URL } from "./constants";
import { useDispatch } from "react-redux";
import { addLoader, removeLoader } from "./loaderSlice";
import { appStore } from "./appStore";

const api = axios.create({
    baseURL : BASE_URL,
    withCredentials : true
})

// const dispatch = useDispatch()

api.interceptors.request.use(
    (config) => {
        if(!config.skipLoader){
            appStore.dispatch(addLoader())
        }
        return config
    },
    (error) => {
        appStore.dispatch(removeLoader())
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
  (response) => {
    appStore.dispatch(removeLoader());
    return response;
  },
  (error) => {
    appStore.dispatch(removeLoader());
    return Promise.reject(error);
  }
);

export default api;