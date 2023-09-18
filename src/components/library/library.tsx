import { useState } from "react";
import { useLibrary } from "../../hooks/useLibrary";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { SearchPubMedModal } from "../search/searchPubMedModal";
import { TouchableRow } from "../userControls/touchableRow";

type PropType = {

}

export const Library = ({ }: PropType) => {

    const { libraries, removeFromLibrary } = useLibrary();
    const [selItem, setSelItem] = useState<ILibrary>()
    const [modalOpen, setModalOpen] = useState(false)

    const onClick = (item: ILibrary) => {
        setSelItem(item);
        setModalOpen(true);
    }

    const onRemove = (item: ILibrary) => (e: React.MouseEvent) => {

        e.stopPropagation();
        e.preventDefault();
        UserControls.Modal.confirm({
            title: 'Confirmation',
            content: 'Are you sure you want to remove selected article?',
            onOk: async () => await removeFromLibrary(item)
        })

    }

    return <UserControls.Row>
        <UserControls.Col xs={24}>
            <UserControls.List
                dataSource={libraries}
                header={<Header />}
                renderItem={renderItem({ onClick, onRemove })}
            />

            <SearchPubMedModal
                open={!!selItem && modalOpen}
                onCancel={() => setModalOpen(false)}
                libraryItem={selItem}
            />
        </UserControls.Col>
    </UserControls.Row>
}

const Header = () => {
    return <UserControls.Row>
        <UserControls.Col xs={6}>
            <UserControls.Typography.Title level={5}>
                id
            </UserControls.Typography.Title>
        </UserControls.Col>
        <UserControls.Col xs={3}>
            <UserControls.Typography.Title level={5}>
                PubMed Id
            </UserControls.Typography.Title>
        </UserControls.Col>
        <UserControls.Col xs={10}>
            <UserControls.Typography.Title level={5}>
                Title
            </UserControls.Typography.Title>
        </UserControls.Col>
        {/* <UserControls.Col xs={6}>
            <UserControls.Typography.Title level={5}>
                Category
            </UserControls.Typography.Title>
        </UserControls.Col> */}
    </UserControls.Row>
}
const renderItem = ({ onClick, onRemove }: { onClick: (item: ILibrary) => void, onRemove: (item: ILibrary) => (e: React.MouseEvent) => void }) => (item: ILibrary) => {
    return <TouchableRow onClick={() => onClick(item)}>
        <UserControls.Col xs={6}>
            <UserControls.Typography>
                {item.id}
            </UserControls.Typography>
        </UserControls.Col>
        <UserControls.Col xs={3}>
            <UserControls.Typography>
                {item.pubMedId}
            </UserControls.Typography>
        </UserControls.Col>
        <UserControls.Col xs={10}>
            <UserControls.Typography>
                {item.title}
            </UserControls.Typography>
        </UserControls.Col>
        <UserControls.Col xs={4}>
            in {(item.projects || []).length} progetti <br />
            in {(item.macroProjects || []).length} macro progetti
        </UserControls.Col>
        <UserControls.Col xs={1}>
            <UserControls.Button icon={<AntdIcons.DeleteOutlined />} onClick={onRemove(item)} />
        </UserControls.Col>
    </TouchableRow>
}