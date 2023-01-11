import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content={'#000'} />
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                    <noscript id="styles-insertion-point" />
                </Head>
                <body className='morena-dental-clinic-app'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
