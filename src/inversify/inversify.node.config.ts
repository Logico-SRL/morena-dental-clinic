import { Container, interfaces } from "inversify";
import { PatientController } from "../controllers/patients/patientController";
import { PatientsController } from "../controllers/patients/patientsController";
import { ProjectsCategoriesController } from "../controllers/projectCategories/projectsCategoriesController";
import { ProjectsController } from "../controllers/projects/projectsController";
import { ProjectCategoriesService } from "../services/categories/ProjectCategoriesService";
import { DbService } from "../services/db/DbService";
import { ExternalPatientsService } from "../services/externalPatients/ExternalPatientsService";
import { PatientsService } from "../services/patients/PatientsService";
import { ProjectsService } from "../services/projects/ProjectsService";
// import { PatientsService } from "../services/patients/PatientsService";
import { IOCControllerTypes, IOCServiceTypes } from "./iocTypes";

const NodeIOCContainer = new Container();

NodeIOCContainer.bind<DbService>(IOCServiceTypes.DbService).to(DbService).inSingletonScope();
NodeIOCContainer.bind<IPatientsService>(IOCServiceTypes.PatientsService).to(PatientsService).inSingletonScope();
NodeIOCContainer.bind<IProjectCategoriesService>(IOCServiceTypes.ProjectCategoriesService).to(ProjectCategoriesService).inSingletonScope();
NodeIOCContainer.bind<IProjectsService>(IOCServiceTypes.ProjectsService).to(ProjectsService).inSingletonScope();
NodeIOCContainer.bind<IExternalPatientsService>(IOCServiceTypes.ExternalPatientsService).to(ExternalPatientsService).inSingletonScope();

NodeIOCContainer.bind<IApiController>(IOCControllerTypes.PatientsController).to(PatientsController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.PatientController).to(PatientController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.ProjectsController).to(ProjectsController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.ProjectsCategoriesController).to(ProjectsCategoriesController);

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

