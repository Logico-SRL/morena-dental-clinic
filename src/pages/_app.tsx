import 'antd/dist/reset.css';
import { AppProps } from "next/app";
import Head from "next/head";
import "reflect-metadata";
import ErrorBoundary from "../components/error/ErrorBoundary";
import { Providers } from "../components/providers/clientProviders";
import RootPageLayout from "../components/rootPageLayout";
import { useRedirectEvent } from '../hooks/useRedirectEvent';
import { IoCProvider } from "../inversify/useService";
import "../styles/global.scss";

function MyApp({ Component, pageProps: { session, ...pageProps },
  ...rest }: AppProps) {

  useRedirectEvent();

  return (
    <ErrorBoundary>
      <IoCProvider>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>Morena-Dental-Clinic</title>
        </Head>
        <Providers session={session}>
          <RootPageLayout>
            <Component {...pageProps} />
          </RootPageLayout>
        </Providers>
      </IoCProvider>
    </ErrorBoundary>
  )
}


export default MyApp;
