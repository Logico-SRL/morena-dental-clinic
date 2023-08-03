import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon.ico" />
                    {/* <link rel="manifest" href="static/site.webmanifest" /> */}
                    <noscript id="styles-insertion-point" />
                    <meta name="description" content={'Morena Screening platform'} />
                    <meta name="author" content={'Logico SRL'} />
                </Head>
                <body className='morena-dental-clinic-app'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
