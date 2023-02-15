import dayjs from "dayjs"

export const formatUtils = {
    formatBytes: (bytes: number, decimals = 2) => {
        if (!+bytes) return '0 Bytes'
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    },
    formatDate: (date?: Date | null) => {
        if (!date)
            return '';
        const dt = dayjs(date);
        if (!dt.isValid())
            return '';
        return dt.format('DD/MM/YYYY')

    },

}