import UserControls from "../../../userControls"
import { TouchableRow } from "./touchableRow"

export const projectRenderer: ItemRendererType<IProjectSearchResult> = (item, { router }) => {
    return <TouchableRow onClick={() => router.push(`/projects/${item.id}`)}>
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
