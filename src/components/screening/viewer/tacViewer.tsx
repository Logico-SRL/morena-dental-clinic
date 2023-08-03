import DwvComponent from "./DwvComponent";


type PropType = {
    src: string,
    unload: boolean
    // open: boolean

}
export const TacViewer: React.FunctionComponent<PropType> = ({ src, unload }) => {
    console.info('unload', unload)
    return unload ? null : <DwvComponent dcmUri={src} />;
}