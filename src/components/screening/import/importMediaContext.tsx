import { createContext } from "react";

const Comp = () => null

const defaultImportMediaContext = {
    open: false,
    setOpen: (val: boolean) => { },
    modalTitle: '',
    setModalTitle: (title: string) => { },
    ModalContent: <Comp />,
    setModalContent: (val: JSX.Element) => { },
    modalOkAction: () => { },
    setModalOkAction: (callback: () => () => void) => { },
    files: [] as IImportMedia[],
    setFiles: (f: IImportMedia[]) => { }
}

export const ImportMediaContext = createContext(defaultImportMediaContext)
