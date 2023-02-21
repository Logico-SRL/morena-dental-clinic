const IOCServiceTypes = {
    DbService: Symbol.for("DbService"),
    PatientsService: Symbol.for("PatientsService"),
    ProjectCategoriesService: Symbol.for("ProjectCategoriesService"),
    ProjectsService: Symbol.for("ProjectsService"),
    ExternalPatientsService: Symbol.for("ExternalPatientsService"),
    HttpService: Symbol.for("HttpService"),
    VisitsService: Symbol.for("VisitsService"),
    MediaService: Symbol.for("MediaService"),
    SettingsService: Symbol.for("SettingsService"),
    FilesService: Symbol.for("FilesService"),
    FilesPreviewService: Symbol.for("FilesPreviewService"),
    TagsService: Symbol.for("TagsService"),
    LibraryService: Symbol.for("LibraryService"),
    UnoDbService: Symbol.for("UnoDbService"),
    AnagraficasService: Symbol.for("AnagraficasService"),
    AnagraficaImportService: Symbol.for("AnagraficaImportService"),
    PubMedService: Symbol.for("PubMedService")

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
    SettingsController: Symbol.for("SettingsController"),
    SettingsMediaSourcesController: Symbol.for("SettingsMediaSourcesController"),
    FileUploadController: Symbol.for("FileUploadController"),
    FileThumbnailsController: Symbol.for("FileThumbnailsController"),
    FileController: Symbol.for("FileController"),
    FileImportController: Symbol.for("FileImportController"),
    TagsController: Symbol.for("TagsController"),
    TagController: Symbol.for("TagController"),
    LibraryController: Symbol.for("LibraryController"),
    AnagraficasController: Symbol.for("AnagraficasController"),
    AnagraficaImportController: Symbol.for("AnagraficaImportController"),
}

export { IOCServiceTypes, IOCControllerTypes };

