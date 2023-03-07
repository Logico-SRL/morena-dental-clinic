

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
}