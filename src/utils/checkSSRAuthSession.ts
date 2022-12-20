import { unstable_getServerSession } from "next-auth/next";
import { redirect } from 'next/navigation';
import { nextAuthOptions } from "../pages/api/auth/nextAuthOptions";

export const checkSSRAuthSession = async () => {
    const session = await unstable_getServerSession(nextAuthOptions)
    console.info('getSSRAuthSession session', session);
    const isLoggedIn = Boolean(session && session.user);

    return { isLoggedIn, session }
}