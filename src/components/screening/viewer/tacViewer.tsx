import DwvComponent from "./DwvComponent";


type PropType = {
    src: string,
    // open: boolean

}
export const TacViewer = ({ src }: PropType) => {

    return !!src ? <DwvComponent dcmUri={src} /> : null;
}