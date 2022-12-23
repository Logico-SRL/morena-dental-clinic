'use client'
import UserControls from "@uc";
import { AntdIcons } from "@icons";
// import { useAuthSession } from "../../hooks/useAuthSession";
import styles from './user.module.scss';
import { Session } from "next-auth";

export const UserAvatar: React.FunctionComponent<{ className?: string, session: Session | null }> = ({ className, session }) => {

    // const { userId, userName, isLoggedIn, isLoading } = useAuthSession()

    const onAvatarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
    }


    return (<div className={styles.avatarContainer} onClick={onAvatarClick}>
        <div className={styles.nameContainer}>
            <UserControls.Typography.Text style={{ display: 'block' }}>
                {session?.user?.name}
            </UserControls.Typography.Text>
            <UserControls.Typography.Text style={{ display: 'block' }}>
                {session?.user?.id}
            </UserControls.Typography.Text>
        </div>
        <UserControls.Avatar size={'large'} className={className} icon={<AntdIcons.UserOutlined />} />
    </div>)
}