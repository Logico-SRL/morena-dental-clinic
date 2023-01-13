import { useRouter } from "next/router";
import { useEffect } from "react";
import { RedirectEventDetailType, RedirectEventType } from "../events/redirectEvent";

export const useRedirectEvent = () => {

    const router = useRouter();

    const onRedirect = (ev: CustomEvent<RedirectEventDetailType>) => {
        const { to } = ev.detail
        router.push(to)
        // debugger;
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // return response;
    }
    // const reponseRejectedCallbak = (error: any) => {
    //     debugger;
    //     // Any status codes that falls outside the range of 2xx cause this function to trigger
    //     // Do something with response error
    //     return Promise.reject(error);
    // }

    useEffect(() => {
        window.addEventListener(RedirectEventType, onRedirect as any)
        // const num = axios.interceptors.response.use(reponseFulfilledCallbak, reponseRejectedCallbak);
        return () => {
            window.removeEventListener(RedirectEventType, onRedirect as any)
            // axios.interceptors.response.eject(num)
        }
    }, [router])


}