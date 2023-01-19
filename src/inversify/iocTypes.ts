const IOCServiceTypes = {
    DbService: Symbol.for("DbService"),
    PatientsService: Symbol.for("PatientsService"),
    ProjectCategoriesService: Symbol.for("ProjectCategoriesService"),
    ProjectsService: Symbol.for("ProjectsService"),
    ExternalPatientsService: Symbol.for("ExternalPatientsService"),
    HttpService: Symbol.for("HttpService"),
    VisitsService: Symbol.for("VisitsService"),
    MediaService: Symbol.for("MediaService"),

};
const IOCControllerTypes = {
    ControllerFactory: Symbol.for("ControllerFactory"),
    PatientsController: Symbol.for("PatientsController"),
    PatientController: Symbol.for("PatientController"),
    ProjectsController: Symbol.for("ProjectsController"),
    ProjectController: Symbol.for("ProjectController"),
    ProjectsCategoriesController: Symbol.for("ProjectsCategoriesController"),
    VisitsController: Symbol.for("VisitsController"),
    VisitController: Symbol.for("VisitController"),
}

export { IOCServiceTypes, IOCControllerTypes };

