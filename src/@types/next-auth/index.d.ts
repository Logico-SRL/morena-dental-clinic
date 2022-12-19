import nextAuth from 'next-auth';

declare module 'next-auth' {

    interface DefaultSession {
        user?: {
            id?: string | null;
            name?: string | null;
        };
        expires: ISODateString;
    }

    interface Session {
        user?: {
            id?: string | null;
            name?: string | null;
        };
    }
}