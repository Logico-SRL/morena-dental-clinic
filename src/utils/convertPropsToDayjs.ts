import Dayjs from 'dayjs';

export const convertPropsToDayjs = <T extends Object>(props: (keyof T)[], obj: T) => {
    if (!obj)
        return obj;

    props.forEach(prop => {
        const val = (obj as any)[prop];
        if (typeof val != 'undefined' && val) {
            (obj as any)[prop] = Dayjs(val);
        }
    })

    return obj;
}

export const convertPropsToDayjsArr = <T extends Object>(props: (keyof T)[], objs: T[]) => {
    if (!objs)
        return objs

    return objs.map(obj => {
        return (convertPropsToDayjs(props, obj))
    })
}