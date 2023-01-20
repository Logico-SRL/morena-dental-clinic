type Dayjs = import("dayjs").Dayjs;
type PatientEntity = import('../../../repository/entities/index').PatientEntity


type IPatient = Required<
    Omit<PatientEntity, 'dateOfBirth' | 'gender' | 'projects'> & {
        gender: gendersKeysType,
        projects: IProject[]
    }
> & {
    dateOfBirth?: Dayjs
};