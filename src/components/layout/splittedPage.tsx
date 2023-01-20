import UserControls from "../../userControls";
import classNames from './layoutCommon.module.scss';

type PropsType = {
    Left?: React.ReactNode,
    LeftTitle?: React.ReactNode,
    Right?: React.ReactNode,
    RightTitle?: React.ReactNode,

}

export const SplittedPage = ({ Left, Right, LeftTitle, RightTitle }: PropsType) => {

    return <UserControls.Row className={classNames.container}>
        {(LeftTitle || RightTitle) && <UserControls.Row className={classNames.titleRow}>
            <UserControls.Col xs={15} className={`${classNames.left} ${classNames.title}`}>
                {LeftTitle && LeftTitle}
            </UserControls.Col>
            <UserControls.Col xs={9} className={`${classNames.right} ${classNames.title}`}>
                {RightTitle && RightTitle}
            </UserControls.Col>
        </UserControls.Row>
        }
        <UserControls.Row className={classNames.contentRow}>
            <UserControls.Col xs={15} className={classNames.left}>
                {/* <UserControls.Row>
                    <UserControls.Col xs={24}>
                    {LeftTitle && LeftTitle}
                    </UserControls.Col>
                <UserControls.Col xs={24}> */}
                {Left && Left}
                {/* </UserControls.Col>
                </UserControls.Row> */}
            </UserControls.Col>
            <UserControls.Col xs={9} className={classNames.right}>
                {/* <UserControls.Row>
                    <UserControls.Col xs={24}>
                    {RightTitle && RightTitle}
                    </UserControls.Col>
                <UserControls.Col xs={24}> */}
                {Right && Right}
                {/* </UserControls.Col>
                </UserControls.Row> */}
            </UserControls.Col>
        </UserControls.Row>
    </UserControls.Row >
}