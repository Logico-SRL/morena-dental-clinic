import { useContext } from "react";
import UserControls from "../../../userControls";
import { UploadMediaContext } from "./uploadMediaContext";

export const UploadModal = () => {

    const context = useContext(UploadMediaContext);

    return <UserControls.Modal
        open={context.open}
        onCancel={() => context.setOpen(false)}
        cancelText={`Keep default image`}
        okButtonProps={{ style: { display: 'none' } }}
        title={context.modalTitle}
    >
        {context.ModalContent}
    </UserControls.Modal>;
}