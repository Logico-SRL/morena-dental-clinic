type ObjectLiteral = import("typeorm").ObjectLiteral;
type Repository<T extends ObjectLiteral> = import("typeorm").Repository<T>;
type AppUserEntity = import("../../repository/entities/appUser").AppUserEntity;
type PatientEntity = import("../../repository/entities/patient").PatientEntity;

type IDbService = {
    usersRepo: () => Promise<Repository<AppUserEntity>>
    patientsRepo: () => Promise<Repository<PatientEntity>>
}