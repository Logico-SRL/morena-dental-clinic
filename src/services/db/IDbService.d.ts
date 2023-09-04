// type ProjectCategoryEntity = import("../../repository/entities/categories").ProjectCategoryEntity;
// type ProjectEntity = import("../../repository/entities/project").ProjectEntity;
// type ObjectLiteral = import("typeorm").ObjectLiteral;


// type Repository<T extends ObjectLiteral> = import("typeorm").Repository<T>;
type AppUserEntity = import("../../repository/entities/appUser").AppUserEntity;
// type PatientEntity = import("../../repository/entities/patient").PatientEntity;

type IDbService = {
    usersRepo: () => Promise<Repository<AppUserEntity>>
    patientsRepo: () => Promise<Repository<PatientEntity>>
    projectCategoriesRepo: () => Promise<Repository<ProjectCategoryEntity>>
    projectsRepo: () => Promise<Repository<ProjectEntity>>
    macroProjectsRepo: () => Promise<Repository<MacroProjectEntity>>
    visitsRepo: () => Promise<Repository<VisitEntity>>
    mediaRepo: () => Promise<Repository<MediaEntity>>
    mediaSourceRepo: () => Promise<Repository<MediaSourceEntity>>
    tagsRepo: () => Promise<Repository<TagEntity>>
}