import UserControls from "../../userControls"
import classNames from './uc.module.scss'

type PropType = {
    title: string,
    links: React.ReactNode
}
export const SectionHeader = ({ title, links }: PropType) => {
    return <UserControls.Row className={classNames.sectionHeader}>
        <UserControls.Col xs={12} className={classNames.sectionTitle}>
            <UserControls.Typography.Text >
                {title}
            </UserControls.Typography.Text>
        </UserControls.Col>

        <UserControls.Col xs={12} className={classNames.sectionLinks}>
            {links}
        </UserControls.Col>
    </UserControls.Row>
}