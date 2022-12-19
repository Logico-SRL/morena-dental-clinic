import { interfaces } from "inversify";
import { NextApiRequest, NextApiResponse } from "next/types";
import { NodeIOCContainer } from "../inversify/inversify.node.config";
import { IOCControllerTypes } from "../inversify/iocTypes";

export const buildController = (pars: symbol) => async (req: NextApiRequest, res: NextApiResponse) => {

    const controllerFactory = NodeIOCContainer.get(IOCControllerTypes.ControllerFactory) as interfaces.Factory<IApiController, [symbol, NextApiRequest, NextApiResponse]>;
    const controllerInstance = controllerFactory(pars, req, res);

    const callable = (controllerInstance as any)[req.method || 'GET'];

    if (callable && typeof callable === 'function') {
        try {
            await callable(req, res)
        } catch (ex: any) {
            console.warn('callable err', ex);
            return res.status(500).json({ error: ex.message });
        }
    }
    else {
        return res.status(404).send('not found');
    }
}