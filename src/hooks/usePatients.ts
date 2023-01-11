// 'use client'
import React from "react"
import { IOCServiceTypes } from "../inversify/iocTypes"
import { useService } from "../inversify/useService"

export const usePatients = () => {
    const [patients, setPatients] = React.useState<IPatient[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)

    React.useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        httpService.get<IPatient[]>(`/api/patients`, { AbortSignal: controller.signal }).then(d => {
            console.info('/api/patients p', d)
            setPatients(d.data);
        }).finally(() => {
            setLoading(false)
        })

        return () => {
            controller.abort();
        }
    }, [])

    return { patients, loading };
}