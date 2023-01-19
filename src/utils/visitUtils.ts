export const visitUtils = {
    getName: (visit: IVisit, visits: IVisit[]): string => {
        const ind = visits.filter(v => v.type == visit.type).findIndex(v => v.id == visit.id);
        switch (visit.type) {
            case 'visit':
                return `Visit ${ind + 1}`
            case 'surgery':
                return `Surgery ${ind + 1}`
            default:
                return ''
        }
    }
}