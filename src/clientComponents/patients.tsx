'use client'

import React from "react"

export const Patients = () => {

    const [patients, setPatients] = React.useState<IPatient[]>([])

    React.useEffect(() => {
        fetch(`/api/patients`)
            .then(r => r.json())
            .then(p => {

                console.info('/api/patients p', p)
                // setPatients(p)
            })
    }, [])

    return <>{patients.map(p => <div>{`${p.id} - ${p.name}`}</div>)}</>
}