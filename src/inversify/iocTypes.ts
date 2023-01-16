const IOCServiceTypes = {
    DbService: Symbol.for("DbService"),
    PatientsService: Symbol.for("PatientsService"),
    CategoriesService: Symbol.for("CategoriesService"),
    ProjectsService: Symbol.for("ProjectsService"),
    ExternalPatientsService: Symbol.for("ExternalPatientsService"),
    HttpService: Symbol.for("HttpService"),

};
const IOCControllerTypes = {
    ControllerFactory: Symbol.for("ControllerFactory"),
    PatientsController: Symbol.for("PatientsController"),
    PatientController: Symbol.for("PatientController"),
}

export { IOCServiceTypes, IOCControllerTypes };
