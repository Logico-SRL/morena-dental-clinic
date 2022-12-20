'use client'
import React from "react"
import { IOCServiceTypes } from "../inversify/iocTypes"
import { useService } from "../inversify/useService"

export const usePatients = () => {
    const [patients, setPatients] = React.useState<IPatient[]>([])
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)

    React.useEffect(() => {
        const controller = new AbortController()
        httpService.get<IPatient[]>(`/api/patients`, { AbortSignal: controller.signal }).then(d => {
            console.info('/api/patients p', d)
            setPatients(d.data);
        })

        return () => {
            controller.abort();
        }
    }, [])

    return patients;
}