import { Container, interfaces } from "inversify";
import { FileController } from "../controllers/files/fileController";
import { FileImportController } from "../controllers/files/fileImportController";
import { FileThumbnailsController } from "../controllers/files/fileThumbnailsController";
import { FileUploadController } from "../controllers/files/fileUploadController";
import { PatientController } from "../controllers/patients/patientController";
import { PatientsController } from "../controllers/patients/patientsController";
import { ProjectsCategoriesController } from "../controllers/projectCategories/projectsCategoriesController";
import { ProjectController } from "../controllers/projects/projectController";
import { ProjectsController } from "../controllers/projects/projectsController";
import { SettingsController } from "../controllers/settings/settingsController";
import { SettingsMediaSourceController } from "../controllers/settings/settingsMediaSourceController";
import { VisitController } from "../controllers/visits/visitController";
import { VisitsController } from "../controllers/visits/visitsController";
import { ProjectCategoriesService } from "../services/categories/ProjectCategoriesService";
import { DbService } from "../services/db/DbService";
import { ExternalPatientsService } from "../services/externalPatients/ExternalPatientsService";
import { FilesService } from "../services/files/FilesService";
import { MediaService } from "../services/media/MediaService";
import { PatientsService } from "../services/patients/PatientsService";
import { ProjectsService } from "../services/projects/ProjectsService";
import { SettingsService } from "../services/settings/SettingsService";
import { VisitsService } from "../services/visits/VisitsService";
// import { PatientsService } from "../services/patients/PatientsService";
import { IOCControllerTypes, IOCServiceTypes } from "./iocTypes";

const NodeIOCContainer = new Container();

NodeIOCContainer.bind<DbService>(IOCServiceTypes.DbService).to(DbService).inSingletonScope();
NodeIOCContainer.bind<IPatientsService>(IOCServiceTypes.PatientsService).to(PatientsService).inSingletonScope();
NodeIOCContainer.bind<IProjectCategoriesService>(IOCServiceTypes.ProjectCategoriesService).to(ProjectCategoriesService).inSingletonScope();
NodeIOCContainer.bind<IProjectsService>(IOCServiceTypes.ProjectsService).to(ProjectsService).inSingletonScope();
NodeIOCContainer.bind<IExternalPatientsService>(IOCServiceTypes.ExternalPatientsService).to(ExternalPatientsService).inSingletonScope();
NodeIOCContainer.bind<IVisitsService>(IOCServiceTypes.VisitsService).to(VisitsService).inSingletonScope();
NodeIOCContainer.bind<IMediaService>(IOCServiceTypes.MediaService).to(MediaService).inSingletonScope();
NodeIOCContainer.bind<ISettingsService>(IOCServiceTypes.SettingsService).to(SettingsService).inSingletonScope();
NodeIOCContainer.bind<IFilesService>(IOCServiceTypes.FilesService).to(FilesService).inSingletonScope();

NodeIOCContainer.bind<IApiController>(IOCControllerTypes.PatientsController).to(PatientsController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.PatientController).to(PatientController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.ProjectsController).to(ProjectsController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.ProjectController).to(ProjectController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.ProjectsCategoriesController).to(ProjectsCategoriesController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.VisitsController).to(VisitsController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.VisitController).to(VisitController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.SettingsController).to(SettingsController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.SettingsMediaSourcesController).to(SettingsMediaSourceController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.FileUploadController).to(FileUploadController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.FileThumbnailsController).to(FileThumbnailsController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.FileController).to(FileController);
NodeIOCContainer.bind<IApiController>(IOCControllerTypes.FileImportController).to(FileImportController);


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

