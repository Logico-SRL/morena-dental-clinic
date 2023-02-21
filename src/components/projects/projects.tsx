// 'use client'

import { useRouter } from "next/navigation";
import UserControls from "../../userControls";
import { ProjectListItem } from "./projectListItem";
// import { PatientListItem } from "./patientListItem";


type PropType = {
    projects: IProject[],
    loading: boolean,
    // onPatientEdit: (p: IPatient) => void
}

export const Projects: React.FunctionComponent<PropType> = ({ projects, loading }) => {


    const router = useRouter();
    const onClick = (project: IProject) => {
        router.push(`/projects/${project.id}`)
    }

    const Header = () => <UserControls.Row style={{ fontWeight: 'bold' }}>
        <UserControls.Col xs={11} offset={1}>
            id
        </UserControls.Col>

        <UserControls.Col xs={12}>
            Title
        </UserControls.Col>

    </UserControls.Row>

    return <UserControls.List
        loading={loading}
        dataSource={projects}
        header={<Header />}
        renderItem={ProjectListItem({ onClick })}

    />
    // >{patients.map(p => <div>{`${p.id} - ${p.name}`}</div>)}</>
}