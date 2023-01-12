type RepoPatient = import('../../repository/entities/patient').PatientEntity

type IPatient = Required<RepoPatient>; // Pick<typeof RepoPatient, 'id' | 'firstName' | 'familyName' | 'fiscalCode' | 'externalId'>