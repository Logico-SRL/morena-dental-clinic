import UserControls from "../../../userControls"
import { TouchableRow } from "../../userControls/touchableRow"

export const visitRenderer: ItemRendererType<IVisitSearchResult> = (item, { router }) => {
    return <TouchableRow onClick={() => router.push(`/projects/${item.projectId}/visits/${item.id}`)}>
        <UserControls.Col xs={6}>
            {item.id}
        </UserControls.Col>
        <UserControls.Col xs={6}>
            {item.type}
        </UserControls.Col>
        <UserControls.Col xs={6}>
            {item.title}
        </UserControls.Col>
    </TouchableRow>
}