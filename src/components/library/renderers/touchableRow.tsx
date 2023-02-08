import { FunctionComponent, PropsWithChildren } from 'react';
import UserControls from '../../../userControls';
import classnames from '../library.module.scss';

export const TouchableRow: FunctionComponent<PropsWithChildren<{ onClick: () => void }>> = ({ children, onClick }) => {
    return <UserControls.Row className={classnames.touchableRow} onClick={onClick}>
        {children}
    </UserControls.Row>
}