// 'use client'

import { useRouter } from "next/router";
import { usePatient } from "../../hooks/usePatient";
// import { usePatient } from "../../hooks/usePatient";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { SectionHeader } from "../userControls/sectionHeader";
import { PatientInfo } from "./patientInfo";

// const Header = ({ onAddClick }: { onAddClick: () => void }) => (
//     <UserControls.Row>
//         <UserControls.Col xs={12}>
//             <UserControls.Typography.Text>
//                 Projects
//             </UserControls.Typography.Text>
//         </UserControls.Col>

//         <UserControls.Col xs={12} style={{ textAlign: 'right' }}>
//             <UserControls.Button icon={<AntdIcons.PlusOutlined />} onClick={onAddClick} />
//         </UserControls.Col>
//     </UserControls.Row>
// )

const ProjectItem = ({ onClick }: { onClick: (item: IProject) => void }) => (item: IProject) => {
    return (<UserControls.List.Item>
        <UserControls.Row style={{ width: '100%', cursor: 'pointer' }}
            onClick={e => { e.preventDefault(); e.stopPropagation(); onClick(item) }}>
            <UserControls.Col xs={12}>
                <UserControls.Typography.Text ellipsis={true}>
                    {item.title}
                </UserControls.Typography.Text>
            </UserControls.Col>
        </UserControls.Row>
    </UserControls.List.Item>)
}

export const Patient = ({ patientId }: { patientId: string }) => {

    const { patient, loadingPatient } = usePatient(patientId);
    const { push } = useRouter();
    const onAddClick = () => {
        push(`/projects/create`)
    }
    const onClick = (item: IProject) => {
        push(`/projects/${item.id}`)
    }
    // const form = UserControls.Form.useForm()

    return <UserControls.Skeleton loading={loadingPatient}>
        <UserControls.Form layout="vertical">
            <PatientInfo patient={patient} />
            <SectionHeader title={"Projects"} links={<UserControls.Button icon={<AntdIcons.PlusOutlined />} onClick={onAddClick} />} />
            <UserControls.Row>
                <UserControls.Col xs={24}>
                    <UserControls.List
                        // header={<Header onAddClick={onAddClick} />}
                        dataSource={patient?.projects}
                        renderItem={ProjectItem({ onClick })}
                    />
                </UserControls.Col>
            </UserControls.Row>
        </UserControls.Form>
    </UserControls.Skeleton>
}