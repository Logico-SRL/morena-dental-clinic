import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import { Provider } from "next-auth/providers"
import CredentialsProvider from "next-auth/providers/credentials"
import { getCsrfToken } from "next-auth/react"
import { SiweMessage } from "siwe"
import { NodeIOCContainer } from "../../../inversify/inversify.node.config"
import { IOCServiceTypes } from "../../../inversify/iocTypes"
import { processEnv } from "../../../processEnv"
import { nextAuthOptions } from "./nextAuthOptions"





// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: NextApiRequest, res: NextApiResponse) {

  const providers: Provider[] = [
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
          // console.info('authorize', credentials);
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
          const nextAuthUrl = new URL(processEnv().nextAuthUrl)

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            //TODO => check request compatibiltiy
            nonce: await getCsrfToken({ req }),
          })

          if (result.success) {

            const dbService = NodeIOCContainer.get<IDbService>(IOCServiceTypes.DbService);
            // console.info(`result.success`, siwe.address);
            const usersRepo = await dbService.usersRepo();
            // console.info(`userRepo resolved`);
            const user = await usersRepo.findOneBy({ id: siwe.address });
            // console.info(`userRepo user`, user);

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

  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth?.includes("signin")

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop()
  }

  return await NextAuth(req, res, { ...nextAuthOptions, providers })
}