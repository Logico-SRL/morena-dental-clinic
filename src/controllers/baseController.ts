import 'reflect-metadata'
import { injectable } from "inversify";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

@injectable()
export class BaseController implements IApiController {

    public req: NextApiRequest | undefined = undefined
    public res: NextApiResponse | undefined = undefined

    protected get Credentials(): Promise<Session> {
        return getSession({ req: this.req }).then(sess => {
            if (sess) {
                return sess
            }
            throw new Error("Invalid session");
        });
    }
}