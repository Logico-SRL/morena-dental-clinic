'use client'
import UserControls from "@uc";
import { AntdIcons } from "@icons";
import { useAuthSession } from "../../hooks/useAuthSession";
import styles from './user.module.scss';

export const UserAvatar: React.FunctionComponent<{ className?: string }> = ({ className }) => {
    const { userId, userName, isLoggedIn, isLoading } = useAuthSession()

    const onAvatarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
    }


    return (<div className={styles.avatarContainer} onClick={onAvatarClick}>
        <div className={styles.nameContainer}>
            <UserControls.Typography.Text style={{ display: 'block' }}>
                {userName}
            </UserControls.Typography.Text>
            <UserControls.Typography.Text style={{ display: 'block' }}>
                {userId}
            </UserControls.Typography.Text>
        </div>
        <UserControls.Avatar size={'large'} className={className} icon={<AntdIcons.UserOutlined />} />
    </div>)
}