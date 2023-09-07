import { useState } from "react"
import UserControls from "../../userControls"
import { AntdIcons } from "../../userControls/icons"
import { SearchPubMedModal } from "../search/searchPubMedModal"
import { TouchableRow } from "../userControls/touchableRow"

type PropType = {
    libraries: ILibrary[],
    remove: (article: ILibrary) => void
}

export const LibraryInfo = ({ libraries, remove }: PropType) => {

    const [selItem, setSelItem] = useState<ILibrary>()
    const [modalOpen, setModalOpen] = useState(false)
    // const { removeFromMacroProj } = useLibrary()


    const onLibClick = (item: ILibrary) => {
        setSelItem(item);
        setModalOpen(true);
    }


    const onDeleteLibClick = (item: ILibrary) => {
        UserControls.Modal.confirm({
            title: 'Confirmation',
            content: 'Are you sure you want to remove selected library?',
            onOk: () => {
                remove(item)
            }
        })
    }

    return <UserControls.Row>
        {libraries.map(lib => {
            return <UserControls.Col xs={24} key={lib.id}>
                <TouchableRow onClick={() => onLibClick(lib)}>
                    <UserControls.Col xs={22}>
                        {lib.id} - {lib.pubMedId} - {lib.title}
                    </UserControls.Col>
                    <UserControls.Col xs={2}>
                        <UserControls.Button onClick={e => { e.stopPropagation(); e.preventDefault(); onDeleteLibClick(lib) }} icon={<AntdIcons.DeleteOutlined />} />
                    </UserControls.Col>
                </TouchableRow>
            </UserControls.Col>
        })}
        <SearchPubMedModal
            open={!!selItem && modalOpen}
            onCancel={() => setModalOpen(false)}
            libraryItem={selItem}
        />
    </UserControls.Row>
}