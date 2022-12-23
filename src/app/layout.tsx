import 'reflect-metadata';
import '../styles/antd.less';
import '../styles/global.scss';

import { Providers } from "../components/providers/clientProviders";
import RootPageLayout from "../components/rootPageLayout";

const RootLayout: LayoutComponent = async ({ children }) => {

    return (
        <html lang="en">
            <head>
                <title>Morena dental care</title>
            </head>
            <body>
                <Providers>
                    <RootPageLayout>
                        {children}
                    </RootPageLayout>
                </Providers>
            </body>
        </html>)
}

export default RootLayout;