import { NodeIOCContainer } from "../../inversify/inversify.node.config";
import { IOCServiceTypes } from "../../inversify/iocTypes";


export default async function (req: NextApiRequest, res: NextApiResponse) {

    const dbserv = NodeIOCContainer.get<IUnoDbService>(IOCServiceTypes.UnoDbService);
    const repo = await dbserv.anagraficaRepo();
    const all = await repo.find({ take: 100 });
    res.status(200).json(all)
}