// 'use client'
// import { usePatient } from "../../hooks/usePatient";
import UserControls from "../../userControls";
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



export const Patient = ({ patient, loadingPatient }: { patient: IPatient | undefined, loadingPatient: boolean }) => {

    // const { push } = useRouter();
    // const onAddClick = () => {
    //     push(`/projects/create`)
    // }
    // const onClick = (item: IProject) => {
    //     push(`/projects/${item.id}`)
    // }
    // const form = UserControls.Form.useForm()

    return <UserControls.Skeleton loading={loadingPatient}>
        <UserControls.Form layout="vertical">
            <PatientInfo patient={patient} />
            {/* <SectionHeader title={"Projects"} links={<UserControls.Button icon={<AntdIcons.PlusOutlined />} onClick={onAddClick} />} /> */}

        </UserControls.Form>
    </UserControls.Skeleton>
}