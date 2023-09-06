import UserControls from "../../userControls"
import { SearchOnline } from "./searchOnline"

type propType = {
    open: boolean,
    onCancel: () => void,
    onSaveItem?: (item: IPubMedDetail) => void
}

export const SearchOnlineModal = ({ open, onCancel, onSaveItem }: propType) => {

    return (<UserControls.Modal
        open={open}
        onCancel={onCancel}
        width={'100vw'}
        bodyStyle={{ minHeight: '70vh' }}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText={'Close'}
    // okText={'Link'}
    // onOk={() => article && onSaveItem && onSaveItem(article)}
    >
        <UserControls.Row>
            <UserControls.Col xs={24} style={{ marginTop: 30 }}>
                <SearchOnline onSaveItem={onSaveItem} />
            </UserControls.Col>
        </UserControls.Row>
    </UserControls.Modal>)
}