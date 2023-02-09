type agesKeysType = import('../../../configurations/ages').agesKeysType
type gendersKeysType = import('../../../configurations/genders').gendersKeysType

type IPatientSearchParams = {
    age?: agesKeysType,
    gender?: gendersKeysType,
    nameSurname?: string,
    fromVisitDate?: Date,
    toVisitDate?: Date,
}