import UserControls from "../../userControls"

type PropType = {
    libraries: ILibrary[]
}
export const LibraryInfo = ({ libraries }: PropType) => {

    return <UserControls.Row>
        {libraries.map(lib => {
            return <UserControls.Col xs={24} key={lib.id}>
                {lib.id} - {lib.pubMedId} - {lib.title}
            </UserControls.Col>
        })}
    </UserControls.Row>
}