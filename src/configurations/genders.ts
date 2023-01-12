export const genders = {
    'male': 'Male',
    'female': 'Female',
    'unknown': 'Unknown',
}


export type gendersKeysType = keyof typeof genders;
export const gendersArr = (Object.keys(genders) as gendersKeysType[]).map((key) => ({ key, value: genders[key] }))