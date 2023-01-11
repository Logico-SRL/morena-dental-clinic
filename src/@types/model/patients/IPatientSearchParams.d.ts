type agesKeysType = import('../../../configurations/ages').agesKeysType

type IPatientSearchParams = {
    age?: agesKeysType,
    fullText?: string
}