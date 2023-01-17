const IOCServiceTypes = {
    DbService: Symbol.for("DbService"),
    PatientsService: Symbol.for("PatientsService"),
    ProjectCategoriesService: Symbol.for("ProjectCategoriesService"),
    ProjectsService: Symbol.for("ProjectsService"),
    ExternalPatientsService: Symbol.for("ExternalPatientsService"),
    HttpService: Symbol.for("HttpService"),

};
const IOCControllerTypes = {
    ControllerFactory: Symbol.for("ControllerFactory"),
    PatientsController: Symbol.for("PatientsController"),
    PatientController: Symbol.for("PatientController"),
    ProjectsController: Symbol.for("ProjectsController"),
    ProjectController: Symbol.for("ProjectController"),
    ProjectsCategoriesController: Symbol.for("ProjectsCategoriesController"),
}

export { IOCServiceTypes, IOCControllerTypes };

