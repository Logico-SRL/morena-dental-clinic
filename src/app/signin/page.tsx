'use client'
import { getCsrfToken, signIn, useSession } from "next-auth/react"
import { SiweMessage } from "siwe"
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthSession } from "../../hooks/useAuthSession"
import { useEffect } from "react"

const SignIn: PageComponent = () => {
    const { signMessageAsync } = useSignMessage()
    const { chain } = useNetwork()
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });

    const { userId, isLoggedIn } = useAuthSession();
    const { push } = useRouter();
    const query = useSearchParams()

    const handleLogin = async () => {
        try {
            const callbackUrl = "/protected"
            const message = new SiweMessage({
                domain: window.location.host,
                address: address,
                statement: "Sign in with Ethereum to the app.",
                uri: window.location.origin,
                version: "1",
                chainId: chain?.id,
                nonce: await getCsrfToken(),
            })
            const signature = await signMessageAsync({
                message: message.prepareMessage(),
            })
            signIn("credentials", {
                message: JSON.stringify(message),
                redirect: false,
                signature,
                callbackUrl,
            })
        } catch (error) {
            window.alert(error)
        }
    }

    useEffect(() => {
        console.log(`isConnected: ${isConnected}, userId: ${userId}`);

        const tm = setTimeout(() => {
            if (isConnected && !userId) {
                handleLogin()
            } else if (isConnected && userId) {
                const u = query.get('callbackUrl') as string | undefined;
                u && push(u);

            }
        }, 400)

        return () => {
            clearTimeout(tm);
        }

    }, [isConnected, userId, query])

    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!isConnected) {
            connect()
        } else {
            handleLogin()
        }
    }

    return (
        <>
            {!isLoggedIn ? <button
                onClick={onButtonClick}>
                Sign-in
            </button> :
                <p>
                    Already logged in: {userId}
                </p>
            }
        </>
    )
}

export default SignIn