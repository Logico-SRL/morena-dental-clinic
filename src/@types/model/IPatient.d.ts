type Dayjs = import("dayjs").Dayjs;
type RepoPatient = import('../../repository/entities/patient').PatientEntity


type IPatient = Required<
    Omit<RepoPatient, 'dateOfBirth' | 'gender'> & {
        gender: gendersKeysType
    }
> & {
    dateOfBirth?: Dayjs
};