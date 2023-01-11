type RepoPatient = import('../../repository/entities/patient').PatientEntity

type IPatient = Pick<RepoPatient, 'id' | 'name' | 'externalId'>