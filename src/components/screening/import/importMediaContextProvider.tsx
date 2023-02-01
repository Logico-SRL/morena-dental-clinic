import { PropsWithChildren, useState } from "react";
import { ImportMediaContext } from "./importMediaContext";
import { ImportMediaModal } from "./importMediaModal";

const Comp = () => null


export const ImportMediaContextProvider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {

    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [ModalContent, setModalContent] = useState<JSX.Element>(<Comp />);
    const [modalOkAction, setModalOkAction] = useState<() => void>(() => { });

    return <ImportMediaContext.Provider value={{ open, setOpen, ModalContent, setModalContent, modalTitle, setModalTitle, modalOkAction, setModalOkAction }}>
        <ImportMediaModal />
        {children}
    </ImportMediaContext.Provider>
}

