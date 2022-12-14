import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getCsrfToken } from "next-auth/react"
import { SiweMessage } from "siwe"
import defaultDataSource from "../../../db/dataSource"
import { AppUserEntity } from "../../../repository/entities/appUser"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          console.info('authorize', credentials);
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL)

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          })

          if (result.success) {

            console.info(`result.success`, siwe.address);
            const usersRepo = await (await defaultDataSource()).getRepository(AppUserEntity);
            console.info(`userRepo resolved`);
            const user = await usersRepo.findOneBy({ id: siwe.address });
            console.info(`userRepo user`, user);

            if (!user || !user.allowed) {
              return null
            }

            return {
              id: siwe.address,
              name: user.name
            }
          }
          return null
        } catch (e) {
          console.error(`authorize`, e);
          return null
        }
      },
    }),
  ]

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth?.includes("signin")

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop()
  }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: `/signin`
    },
    callbacks: {
      async jwt({ token, account, profile, user }) {
        console.info(`nextAuth callbacks jwt`, token, account, profile, user);
        const isLogin = !!user;
        if (isLogin) {
          console.info(`nextAuth callbacks jwt isLogin`);
          return {
            id: user?.id,
            name: user?.name
          };
        }

        return token;
      },
      async session({ session, token, user }) {

        console.info(`nextAuth callbacks session`, session, token, user);

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
  })
}