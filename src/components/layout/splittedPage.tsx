import UserControls from "../../userControls";
import classNames from './layoutCommon.module.scss';

type PropsType = {
    Left?: React.ReactNode,
    LeftTitle?: React.ReactNode,
    Right?: React.ReactNode,
    RightTitle?: React.ReactNode,
    fullWidth?: boolean

}

export const SplittedPage = ({ Left, Right, LeftTitle, RightTitle, fullWidth }: PropsType) => {

    return <UserControls.Row className={classNames.container}>
        {(LeftTitle || RightTitle) && <UserControls.Row className={classNames.titleRow}>
            <UserControls.Col xs={fullWidth ? 24 : 15} className={`${classNames.left} ${classNames.title}`}>
                {LeftTitle && LeftTitle}
            </UserControls.Col>
            {!fullWidth && <UserControls.Col xs={9} className={`${classNames.right} ${classNames.title}`}>
                {RightTitle && RightTitle}
            </UserControls.Col>}
        </UserControls.Row>
        }
        <UserControls.Row className={classNames.contentRow}>
            <UserControls.Col xs={fullWidth ? 24 : 15} className={classNames.left}>
                {Left && Left}
            </UserControls.Col>
            {!fullWidth && <UserControls.Col xs={9} className={classNames.right}>
                {Right && Right}
            </UserControls.Col>}
        </UserControls.Row>
    </UserControls.Row >
}