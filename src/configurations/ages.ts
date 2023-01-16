
export const ages: agesType = {
    'age0': {
        value: '0-13',
        query: { from: 0, to: 13 }
    },
    'age1': { value: '14-18', query: { from: 0, to: 18 } },
    'age2': { value: '19-30', query: { from: 19, to: 30 } },
    'age3': { value: '31-55', query: { from: 31, to: 55 } },
    'age4': { value: '56-70', query: { from: 56, to: 70 } },
    'age5': { value: '71+', query: { from: 71 } }
}

type agesType = {
    [key: string]: {
        value: string,
        query: { from: number, to?: number }
    }
}

export type agesKeysType = keyof typeof ages;
export const agesArr = (Object.keys(ages) as agesKeysType[]).map((key) => ({ key, value: ages[key].value }))