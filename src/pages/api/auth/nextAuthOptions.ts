import { AuthOptions } from "next-auth";
import { processEnv } from "../../../processEnv";

export const nextAuthOptions: Omit<AuthOptions, 'providers'> = {
    // https://next-auth.js.org/configuration/providers/oauth
    // providers,
    session: {
        strategy: "jwt",
    },
    secret: processEnv().nextAuthSecret,
    pages: {
        signIn: `/signin`
    },
    callbacks: {
        async jwt({ token, account, profile, user }) {
            // console.info(`nextAuth callbacks jwt`, token, account, profile, user);
            const isLogin = !!user;
            if (isLogin) {
                // console.info(`nextAuth callbacks jwt isLogin`);
                return {
                    id: user?.id,
                    name: user?.name
                };
            }

            return token;
        },
        async session({ session, token, user }) {

            // console.info(`nextAuth callbacks session`, session, token, user);

            // if (isLogin) {
            return {
                expires: session.expires,
                user: {
                    id: token.id as string,
                    name: token.name as string
                }
            }
            // }
            // else {
            // return session;
            // }
        },
    },
}