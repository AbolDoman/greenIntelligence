import { AxiosInstance } from "./api";

export const postLoginData = (callback, body, params="") => {
    AxiosInstance().post(`/login${params}`, body)
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => callback(false, err))
};
