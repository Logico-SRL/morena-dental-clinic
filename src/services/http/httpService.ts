import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { injectable } from "inversify";
import { RedirectEvent } from '../../events/redirectEvent';

const defaultConfig: AxiosRequestConfig = {
    maxRedirects: 0,
    validateStatus: (status) => {
        return (status >= 200 && status < 300)
    },
}

@injectable()
export class HttpService implements IHttpService {


    constructor() { }


    get<T>(url: string, config?: AxiosRequestConfig, allowRedirect: boolean = true): Promise<AxiosResponse<T>> {
        return axios.get(url, { ...defaultConfig, ...config }).then(res => {
            const isRedirect = !(res.request.responseURL as string).endsWith(url)
            if (isRedirect && allowRedirect) {
                // debugger;
                window.dispatchEvent(new RedirectEvent({ to: res.request.responseURL }).event)
                throw new Error("Redirecting");
            }
            return res;
        });
    }
    // delete<T,  D = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    //     throw new Error("Method not implemented.");
    // }
    delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return axios.delete(url, { ...defaultConfig, ...config });
    }
    post<T, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<R> {
        return axios.post(url, data, { ...defaultConfig, ...config });
    }
    put<T, R = AxiosResponse<T>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig): Promise<R> {
        return axios.put(url, data, { ...defaultConfig, ...config });
    }
    // patch<T,  D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    //     throw new Error("Method not implemented.");
    // }



}