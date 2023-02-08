import UserControls from "../../../userControls"
import { TouchableRow } from "./touchableRow"

export const patientRenderer: ItemRendererType<IPatientSearchResult> = (item, { router }) => {
    return <TouchableRow onClick={() => router.push(`/patients/${item.id}`)}>
        <UserControls.Col xs={6}>
            {item.id}
        </UserControls.Col>
        <UserControls.Col xs={6}>
            {item.type}
        </UserControls.Col>
        <UserControls.Col xs={6}>
            {item.firstName}
        </UserControls.Col>
    </TouchableRow>
}
