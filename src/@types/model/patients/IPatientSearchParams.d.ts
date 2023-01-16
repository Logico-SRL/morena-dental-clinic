type agesKeysType = import('../../../configurations/ages').agesKeysType
type gendersKeysType = import('../../../configurations/genders').gendersKeysType

type IPatientSearchParams = {
    age?: agesKeysType,
    gender?: gendersKeysType,
    fullText?: string,
    fromVisitDate?: Date,
    toVisitDate?: Date,
}