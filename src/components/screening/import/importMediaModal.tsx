import { useContext } from "react";
import UserControls from "../../../userControls";
import classnames from '../screening.module.scss';
import { ImportMediaContext } from "./importMediaContext";

export const ImportMediaModal = () => {

    const context = useContext(ImportMediaContext);

    return <UserControls.Modal
        wrapClassName={classnames.largeModalWrap}
        open={context.open}
        onCancel={() => context.setOpen(false)}
        cancelText={`Cancel import`}
        okText={`Import selected`}
        onOk={context.modalOkAction}
        // okButtonProps={{ style: { display: 'none' } }}
        title={context.modalTitle}
    >
        {context.ModalContent}
    </UserControls.Modal>;
}