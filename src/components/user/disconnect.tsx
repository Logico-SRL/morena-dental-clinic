// 'use client'

import { signOut } from 'next-auth/react'
import React from "react"
import { useDisconnect } from "wagmi"

export const Disconnect = () => {
    const { disconnect } = useDisconnect()

    const onClick: React.MouseEventHandler<HTMLDivElement> = e => {
        e.stopPropagation();
        e.preventDefault();
        disconnect();
        signOut();
    }

    return (<div onClick={onClick}>
        Disconnect
    </div>)
}