import { getCsrfToken, signIn, useSession } from "next-auth/react"
import { SiweMessage } from "siwe"
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi"
import Layout from "../components/layout"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useEffect, useState } from "react"
import { useAuthSession } from "../hooks/useAuthSession"
import { useRouter } from "next/router"

function SignIn() {
  const { signMessageAsync } = useSignMessage()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { userId, isLoggedIn } = useAuthSession();
  const { query, push } = useRouter();

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
        const u = query['callbackUrl'] as string | undefined;
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
    <Layout>
      {!isLoggedIn ? <button
        onClick={onButtonClick}>
        Sign-in
      </button> :
        <p>
          Already logged in: {userId}
        </p>
      }
    </Layout>
  )
}

// export async function getServerSideProps(context: any) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   }
// }

SignIn.Layout = Layout

export default SignIn