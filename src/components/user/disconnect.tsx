// 'use client'

import { signOut } from 'next-auth/react'
import React from "react"
import { useDisconnect } from "wagmi"
import UserControls from '../../userControls'
import { processEnv } from 'src/processEnv'

export const Disconnect = () => {
    const { disconnect } = useDisconnect()

    const onClick: React.MouseEventHandler<any> = e => {
        e.stopPropagation();
        e.preventDefault();
        disconnect();
        signOut({callbackUrl:processEnv().nextAuthUrl});
    }

    return (<UserControls.Button onClick={onClick}>
        LOGOUT
    </UserControls.Button>)
}