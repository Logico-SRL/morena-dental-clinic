import { PropsWithChildren, useState } from "react";
import { UploadMediaContext } from "./uploadMediaContext";
import { UploadModal } from "./uploadModal";

const Comp = () => null

export const UploadModalContextProvider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {

    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [ModalContent, setModalContent] = useState<JSX.Element>(<Comp />);

    return <UploadMediaContext.Provider value={{ open, setOpen, ModalContent, setModalContent, modalTitle, setModalTitle }}>
        <UploadModal />
        {children}
    </UploadMediaContext.Provider>
}