// "use client"
import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { mainnet } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { IoCProvider } from "../../inversify/useService"

export const { chains, provider } = configureChains(
    [mainnet],
    [publicProvider()]
)

const client = createClient({
    autoConnect: true,
    provider,
})

export const Providers: React.FunctionComponent<PropsWithChildren<{ session: any }>> = ({ children, session }) => {
    return (
        <IoCProvider>
            <WagmiConfig client={client}>
                <SessionProvider refetchInterval={0} session={session}>
                    {children}
                </SessionProvider>
            </WagmiConfig>
        </IoCProvider>
    )
}