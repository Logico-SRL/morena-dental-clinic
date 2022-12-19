import { Container, interfaces } from "inversify";
import { PatientsController } from "../controllers/patients/patientsController";
// import { PatientsController } from "../controllers/patients/patientsController";
import { DbService } from "../services/db/DbService";
import { PatientsService } from "../services/patients/PatientsService";
import { IOCControllerTypes, IOCServiceTypes } from "./iocTypes";

const NodeIOCContainer = new Container();

// const dbServiceSingleton = Symbol.for("DbServiceSingleton");
NodeIOCContainer.bind<DbService>(IOCServiceTypes.DbService).to(DbService).inSingletonScope();
// NodeIOCContainer.bind<IDbService>(IOCServiceTypes.DbService).toProvider<IDbService>(
//     (context) =>
//         () => {
//             let dbService = context.container.get<DbService>(dbServiceSingleton)
//             if (dbService) {
//                 console.info(`dbServiceProvider found in singleton context scope`)
//                 return new Promise(res => {
//                     res(dbService)
//                 })
//             }
//             console.info(`dbServiceProvider NOT found in singleton context scope`)
//             dbService = new DbService();
//             return new Promise<IDbService>(async (res) => {
//                 await dbService.initialize();
//                 res(dbService);
//             })
//         });
// (DbService).inSingletonScope();
NodeIOCContainer.bind<IPatientsService>(IOCServiceTypes.PatientsService).to(PatientsService).inSingletonScope();

NodeIOCContainer.bind<IApiController>(IOCControllerTypes.PatientsController).to(PatientsController);

NodeIOCContainer.bind<interfaces.Factory<IApiController, [symbol, NextApiRequest, NextApiResponse]>>(IOCControllerTypes.ControllerFactory)
    .toFactory<IApiController, [symbol, NextApiRequest, NextApiResponse]>(context => {
        return (key: symbol, req: NextApiRequest, res: NextApiResponse) => {
            let controller = context.container.get<IApiController>(key);
            controller.req = req;
            controller.res = res;
            return controller;
        };
    });

export { NodeIOCContainer };

