import 'reflect-metadata';
import '../styles/global.scss';
import '../styles/antd.less';

import { FunctionComponent, PropsWithChildren } from "react";
import { Providers } from "../clientComponents/clientProviders";
import RootPageLayout from "../serverComponents/rootPageLayout";

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children, ...rest }) => {
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