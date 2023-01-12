type AxiosResponse<T> = import("axios").AxiosResponse<T, any>
type AxiosRequestConfig = import("axios").AxiosRequestConfig<any>

type IHttpService = {
    get<T>(url: string, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T>>;
    // delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    // put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    // patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}