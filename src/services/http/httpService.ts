import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

@injectable()
export class HttpService implements IHttpService {


    constructor() { }
    get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return axios.get(url, config);
    }
    // delete<T,  D = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    //     throw new Error("Method not implemented.");
    // }
    // post<T,  D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    //     throw new Error("Method not implemented.");
    // }
    // put<T,  D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    //     throw new Error("Method not implemented.");
    // }
    // patch<T,  D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    //     throw new Error("Method not implemented.");
    // }



}