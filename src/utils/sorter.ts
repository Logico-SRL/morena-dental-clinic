import { formatUtils } from "./formatUtils";


export class Sorter<T extends Object> {

    private readonly attribute: keyof T;

    constructor(attribute: keyof T) {
        this.attribute = attribute;
    }

    public get sortAsc() {
        return (a: T, b: T) => {
            const aVal = a[this.attribute] as any;
            const bVal = b[this.attribute] as any;
            return (aVal - bVal);
        }
    }

    public get sortDesc() {
        return (a: T, b: T) => {
            const aVal = a[this.attribute] as any;
            const bVal = b[this.attribute] as any;
            return (bVal - aVal);
        }
    }

    public get sortDateAsc() {
        return (a: T, b: T) => {
            const aVal = a[this.attribute] as any;
            const bVal = b[this.attribute] as any;

            const aDate = formatUtils.getDayjsDate(aVal)
            const bDate = formatUtils.getDayjsDate(bVal)

            const isBefore = aDate?.isBefore(bDate, 'day') ? -1 : 1
            console.info('aDate', aDate?.format('DD/MM/YYYY HH:mm') ?? 'null', 'bDate', bDate?.format('DD/MM/YYYY HH:mm') ?? 'null', 'isBefore', isBefore)
            return isBefore;
        }
    }

    public get sortDateDesc() {
        return (a: T, b: T) => {
            const aVal = a[this.attribute] as any;
            const bVal = b[this.attribute] as any;
            const aDate = formatUtils.getDayjsDate(aVal)
            const bDate = formatUtils.getDayjsDate(bVal)
            return aDate?.isBefore(bDate) ? 1 : -1
        }
    }
}