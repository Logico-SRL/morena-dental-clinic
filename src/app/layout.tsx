import 'reflect-metadata';
import '../styles/global.scss';
import '../styles/antd.less';

import { FunctionComponent, PropsWithChildren } from "react";
import { Providers } from "../clientComponents/clientProviders";
import RootPageLayout from "../serverComponents/rootPageLayout";
import { cookies } from 'next/headers';
import { unstable_getServerSession, } from "next-auth/next"
import { checkSSRAuthSession } from '../utils/checkSSRAuthSession';

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