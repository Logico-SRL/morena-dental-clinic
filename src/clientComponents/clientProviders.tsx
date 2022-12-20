"use client"
import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"
import { WagmiConfig, createClient, configureChains } from "wagmi"
import { mainnet } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { IoCProvider } from "../inversify/useService"

export const { chains, provider } = configureChains(
    [mainnet],
    [publicProvider()]
)

const client = createClient({
    autoConnect: true,
    provider,
})

export const Providers: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <IoCProvider>
            <WagmiConfig client={client}>
                <SessionProvider refetchInterval={0}>
                    {children}
                </SessionProvider>
            </WagmiConfig>
        </IoCProvider>
    )
}