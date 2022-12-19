import { NodeIOCContainer } from "../../inversify/inversify.node.config";
import { IOCServiceTypes } from "../../inversify/iocTypes";

const getData = async (): Promise<{ name: string }[]> => {

    const res = await new Promise<{ name: string }[]>(res => {
        setTimeout(() => {
            const v = [{ name: 'pippo' }]
            res(v)
        }, 5000);
    })


    // const patientsService = NodeIOCContainer.get<IPatientsService>(IOCServiceTypes.PatientsService);
    // return await patientsService.list();

    // const serv = NodeIOCContainer.get<IDbService>(IOCServiceTypes.DbService);
    // const repo = await serv.patientsRepo();
    // return await repo.find();


    //     const dt = new DataSource(dbConfig);
    return res;

}


export const Pippo: any = async () => {
    const vals = await getData();
    return <div>
        {vals.map(v => <div key={v.name}>{v.name}</div>)}
    </div>
};