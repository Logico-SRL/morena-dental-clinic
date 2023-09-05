import { useEffect } from "react"
import { defaultNote } from "../../../services/defaultValues/defaultNote"
import UserControls from "../../../userControls"

type PropType = {
    open: boolean,
    onCancel: () => void,
    onSave: (note: INote) => void,
    onDelete: (note: INote) => void,
    note: INote | null
}

export const AddNoteModal = ({ open, onCancel, note, onSave, onDelete }: PropType) => {

    const isCreation = !note;

    useEffect(() => {
        if (open) {
            if (note) {
                form.setFieldsValue(note)
            } else {
                form.setFieldsValue(defaultNote())
            }
        }
    }, [open, note])

    const [form] = UserControls.Form.useForm<INote>()

    const submitForm = () => {
        form.validateFields()
            .then(val => {
                onSave(val);
            }).catch(err => {
                console.warn(`addNoteModal submitForm validate`, err);
            })
    }

    const Footer = <UserControls.Row>
        <UserControls.Col xs={24} style={{ textAlign: 'right', padding: 10 }}>
            <UserControls.Space>
                <UserControls.Button hidden={isCreation} onClick={() => note && onDelete(note)}>Delete</UserControls.Button>
                <UserControls.Button onClick={onCancel}>Close</UserControls.Button>
                <UserControls.Button onClick={submitForm}>{isCreation ? 'Create' : 'Save'}</UserControls.Button>

            </UserControls.Space>
        </UserControls.Col>
    </UserControls.Row>


    return <UserControls.Modal open={open} width={'100vw'} onCancel={onCancel} okText={'Save'} onOk={submitForm} footer={Footer}>
        <div style={{ width: '100%', height: '100%', padding: 40 }}>
            <UserControls.Form form={form} layout="vertical">
                <UserControls.Form.Item label="Note Title" name={'title'}>
                    <UserControls.Input style={{ fontWeight: 'bold' }} placeholder={'Premesse, Obbiettivo, Conclusioni....'} />
                </UserControls.Form.Item>
                <UserControls.Form.Item label="Content" name={'content'}>
                    <UserControls.Input.TextArea rows={8} />
                </UserControls.Form.Item>
                <UserControls.Form.Item hidden name={'id'} />
                <UserControls.Form.Item hidden name={'date'} />
            </UserControls.Form>
        </div>
    </UserControls.Modal>
}