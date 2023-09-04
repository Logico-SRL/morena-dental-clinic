// 'use client'

import { useRouter } from "next/navigation";
import UserControls from "../../userControls";
import { MacroProjectListItem } from "./macroProjectListItem";
// import { PatientListItem } from "./patientListItem";


type PropType = {
    macroprojects: IMacroProject[],
    loading: boolean,
    // onPatientEdit: (p: IPatient) => void
}

export const MacroProjects: React.FunctionComponent<PropType> = ({ loading, macroprojects }) => {


    const router = useRouter();

    const onClick = (project: IMacroProject) => {
        router.push(`/macroprojects/${project.id}`)
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
        dataSource={macroprojects}
        header={<Header />}
        renderItem={MacroProjectListItem({ onClick })}

    />
}