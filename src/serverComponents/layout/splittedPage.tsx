import UserControls from "../../userControls";
import classNames from './layoutCommon.module.scss';

type PropsType = {
    Left?: React.ComponentType,
    Right?: React.ComponentType,
}

export const SplittedPage = ({ Left, Right }: PropsType) => {
    return <UserControls.Row className={classNames.container}>
        <UserControls.Col xs={16} className={classNames.left}>
            {Left && <Left />}
        </UserControls.Col>
        <UserControls.Col flex={'auto'} className={classNames.right}>
            {Right && <Right />}
        </UserControls.Col>
    </UserControls.Row >
}