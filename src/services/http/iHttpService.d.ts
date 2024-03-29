type AxiosResponse<T> = import("axios").AxiosResponse<T, any>
type AxiosRequestConfig<T> = import("axios").AxiosRequestConfig<T>

type IHttpService = {
    get<T>(url: string, config?: AxiosRequestConfig<D>, allowRedirect?: boolean): Promise<AxiosResponse<T>>;
    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<any>): Promise<R>;
    post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    // patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}