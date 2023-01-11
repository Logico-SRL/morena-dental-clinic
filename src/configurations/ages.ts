export const ages = {
    'age0': '0-13',
    'age1': '14-18',
    'age2': '19-30',
    'age3': '31-55',
    'age4': '56-70',
    'age5': '71+'
}


export type agesKeysType = keyof typeof ages;
export const agesArr = (Object.keys(ages) as agesKeysType[]).map((key) => ({ key, value: ages[key] }))