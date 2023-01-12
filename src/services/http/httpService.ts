import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { injectable } from "inversify";

@injectable()
export class HttpService implements IHttpService {


    constructor() { }
    get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return axios.get(url, config);
    }
    // delete<T,  D = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    //     throw new Error("Method not implemented.");
    // }
    post<T, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<R> {
        return axios.post(url, data, config);
    }
    put<T, R = AxiosResponse<T>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig): Promise<R> {
        return axios.put(url, data, config);
    }
    // patch<T,  D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    //     throw new Error("Method not implemented.");
    // }



}