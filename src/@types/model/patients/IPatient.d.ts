type Dayjs = import("dayjs").Dayjs;
type RepoPatient = import('../../../repository/entities/index').PatientEntity


type IPatient = Required<
    Omit<RepoPatient, 'dateOfBirth' | 'gender' | 'projects'> & {
        gender: gendersKeysType,
        projects: IProject[]
    }
> & {
    dateOfBirth?: Dayjs
};