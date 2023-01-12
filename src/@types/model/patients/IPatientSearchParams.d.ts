type agesKeysType = import('../../../configurations/ages').agesKeysType

type IPatientSearchParams = {
    age?: agesKeysType,
    gender?: gendersKeysType,
    fullText?: string,
    fromVisitDate?: Date,
    toVisitDate?: Date,
}