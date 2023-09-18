import { interfaces } from "inversify";
import { NextApiRequest, NextApiResponse } from "next/types";
import { NodeIOCContainer } from "../inversify/inversify.node.config";
import { IOCControllerTypes, IOCServiceTypes } from "../inversify/iocTypes";

const whiteListUris = [
    `/api/logs`,
    `/api/logger`,
]

export const buildController = (pars: symbol) => async (req: NextApiRequest, res: NextApiResponse) => {

    const controllerFactory = NodeIOCContainer.get(IOCControllerTypes.ControllerFactory) as interfaces.Factory<IApiController, [symbol, NextApiRequest, NextApiResponse]>;
    const controllerInstance = controllerFactory(pars, req, res);
    const callable = (controllerInstance as any)[req.method || 'GET'];
    const logger = NodeIOCContainer.get<ILogger>(IOCServiceTypes.LoggerService)

    if (callable && typeof callable === 'function') {
        try {

            !whiteListUris.some(u => req.url?.startsWith(u)) && logger.info(`callable calling api`, { url: req.url })
            await callable(req, res)
        } catch (ex: any) {
            logger.error('callable error', { error: ex.message })
            // console.warn('callable err', ex);
            return res.status(500).json({ error: ex.message });
        }
    }
    else {
        return res.status(404).send('not found');
    }
}