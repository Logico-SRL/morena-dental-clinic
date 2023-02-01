import { createContext } from "react";

const Comp = () => null

const defaultUploadMediaContext = {
    open: false,
    setOpen: (val: boolean) => { },
    modalTitle: '',
    setModalTitle: (title: string) => { },
    ModalContent: <Comp />,
    setModalContent: (val: JSX.Element) => { },
}


export const UploadMediaContext = createContext(defaultUploadMediaContext)

