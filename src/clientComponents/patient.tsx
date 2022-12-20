'use client'

import React from "react"
import { usePatient } from "../hooks/usePatient"

export const Patient = ({ patientId }: { patientId: string }) => {

    const patient = usePatient(patientId);
    return <>{JSON.stringify(patient)}</>
}