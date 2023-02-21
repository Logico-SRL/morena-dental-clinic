// 'use client'

// import { usePatient } from "../../hooks/usePatient";
import UserControls from "../../userControls";


type PropType = {
    onClick: (project: IProject) => void,
    // onEdit: (patient: IPatient) => void,

}
export const ProjectListItem = ({ onClick }: PropType) => (project: IProject) => {

    const onItemClick = () => {
        onClick(project)
    }

    return <UserControls.List.Item className="touchable" onClick={onItemClick}>
        <UserControls.Row style={{ flex: 1 }}>

            <UserControls.Col xs={12}>
                {project.id}
            </UserControls.Col>

            <UserControls.Col xs={12}>
                {project.title}
            </UserControls.Col>

            {/* <UserControls.Col xs={5}>
                {patient.familyName}
            </UserControls.Col>

            <UserControls.Col xs={5}>
                {patient.fiscalCode}
            </UserControls.Col>
            <UserControls.Col xs={1}>
                <UserControls.Button icon={<AntdIcons.EditOutlined />} onClick={onPatientEdit} />
            </UserControls.Col> */}

        </UserControls.Row>
    </UserControls.List.Item>
}