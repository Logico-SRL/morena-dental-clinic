import React from "react"
import { IOCServiceTypes } from "../inversify/iocTypes"
import { useService } from "../inversify/useService"

export const usePatient = (patientId: string) => {
    const [patient, setPatient] = React.useState<IPatient>()
    const [loading, setLoading] = React.useState<boolean>(false)
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)

    React.useEffect(() => {
        const controller = new AbortController()
        setLoading(true);
        httpService.get<IPatient>(`/api/patients/${patientId}`, { AbortSignal: controller.signal }).then(d => {
            console.info(`/api/patients/${patientId}`, d)
            setPatient(d.data);
        })
            .finally(() => {
                setLoading(false);
            })

        return () => {
            controller.abort();
        }
    }, [])

    return { patient, loading };
}