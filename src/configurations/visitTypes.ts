export const visitTypes: { [key in VisitTypes]: string } = {
    'visit': 'Visit',
    'surgery': 'Surgery',
}


export type visitTypesKeysType = keyof typeof visitTypes;
export const visitTypesArr = (Object.keys(visitTypes) as visitTypesKeysType[]).map((key) => ({ key, value: visitTypes[key] }))