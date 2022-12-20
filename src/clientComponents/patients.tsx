'use client'

import React from "react"
import { usePatients } from "../hooks/usePatients"
import { IOCServiceTypes } from "../inversify/iocTypes"
import { useService } from "../inversify/useService"

export const Patients = () => {

    const patients = usePatients();
    return <>{patients.map(p => <div>{`${p.id} - ${p.name}`}</div>)}</>
}