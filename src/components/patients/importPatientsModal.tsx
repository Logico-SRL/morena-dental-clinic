import { useEffect, useMemo, useState } from "react";
import { usePatients } from "../../hooks/usePatients";
import { AAnagrafica } from "../../repository/unoEntities/entities/AAnagrafica";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { formatUtils } from "../../utils/formatUtils";
import classnames from './patients.module.scss';

type PropType = {
    open: boolean,
    onClose: () => void,
}

type SourceType = AAnagrafica & { checked: boolean }

export const ImportPatientsModal = ({ open, onClose }: PropType) => {

    const Form = UserControls.Form;
    const { searchExternalAnagrafica, importExternalAnagrafica } = usePatients()

    const [form] = Form.useForm<IUnoAnagraficaSearchParams>();
    const [users, setUsers] = useState<SourceType[]>([]);

    useEffect(() => {
        if (!open) {
            setUsers([])
        }
    }, [open])

    const selectedUsers = useMemo(() => users.filter(u => u.checked), [users])

    const onSearchClick = async () => {
        const pars = form.getFieldsValue();
        const resp = await searchExternalAnagrafica(pars);
        setUsers(resp.map(r => ({ ...r, checked: false })))
    }


    const onOk = async () => {
        const toImport = selectedUsers.map(({ checked, ...u }) => u);
        try {
            const imported = await importExternalAnagrafica(toImport);
            UserControls.notification.success({
                message: 'Done',
                description: `Imported ${imported.length} user${imported.length > 1 ? 's' : ''}`,
                placement: 'bottomLeft'
            })
            onClose();

        } catch (ex: any) {

            UserControls.notification.error({
                message: 'Not Done',
                description: `Error while importing: ${ex.message}`,
                placement: 'bottomLeft'
            })
        }

    }

    const onItemCheckChange = (e: any, item: SourceType) => {
        const checked: boolean = e.target.checked;
        setUsers(u => {
            const vals = [...u];
            const found = vals.find(v => v.id === item.id);
            if (found) {
                found.checked = checked;
            }
            return vals;
        })
    }

    return <UserControls.Modal
        open={open}
        onCancel={onClose}
        title={'Import Patients'}
        okText={'Import'}
        onOk={onOk}
        okButtonProps={{ disabled: selectedUsers.length == 0 }}
        wrapClassName={classnames.importModalWrap}
    >
        <UserControls.Col xs={24}>
            <Form form={form} layout="vertical" initialValues={{ nome: '', cognome: '', codiceFiscale: '' }} onFinish={onSearchClick} >
                <UserControls.Row gutter={20}>
                    <UserControls.Col xs={7}>
                        <Form.Item name={'nome'} label={'name'}>
                            <UserControls.Input allowClear autoComplete="off" />
                        </Form.Item>
                    </UserControls.Col>
                    <UserControls.Col xs={7}>
                        <Form.Item name={'cognome'} label={'family name'}>
                            <UserControls.Input allowClear autoComplete="off" />
                        </Form.Item>
                    </UserControls.Col>
                    <UserControls.Col xs={7}>
                        <Form.Item name={'codiceFiscale'} label={'fiscal code'}>
                            <UserControls.Input allowClear autoComplete="off" />
                        </Form.Item>
                    </UserControls.Col>
                    <UserControls.Col xs={3}>
                        <Form.Item noStyle>
                            <UserControls.Button htmlType="submit" icon={<AntdIcons.SearchOutlined />} style={{ marginTop: 24 }}>
                                Search
                            </UserControls.Button>
                        </Form.Item>
                    </UserControls.Col>
                    <UserControls.Col xs={24}>

                        <UserControls.List
                            header={<Header />}
                            renderItem={renderItem(onItemCheckChange)}
                            dataSource={users}
                        />

                    </UserControls.Col>
                </UserControls.Row>
            </Form>
        </UserControls.Col>
    </UserControls.Modal >
}

const Header = () => <UserControls.Row>
    <UserControls.Col xs={1}>

    </UserControls.Col>
    <UserControls.Col xs={6}>
        <UserControls.Typography.Title level={5}>
            Name
        </UserControls.Typography.Title>
    </UserControls.Col>

    <UserControls.Col xs={6}>
        <UserControls.Typography.Title level={5}>
            Family Name
        </UserControls.Typography.Title>
    </UserControls.Col>

    <UserControls.Col xs={6}>
        <UserControls.Typography.Title level={5}>
            Fiscal Code
        </UserControls.Typography.Title>
    </UserControls.Col>

    <UserControls.Col xs={5}>
        <UserControls.Typography.Title level={5}>
            Birthdate
        </UserControls.Typography.Title>
    </UserControls.Col>
</UserControls.Row>

const renderItem = (onItemCheckChange: (e: any, item: SourceType) => void) => (item: SourceType) => {
    return <UserControls.Row className={classnames.rowItem}>
        <UserControls.Col xs={1}>
            <UserControls.Checkbox checked={item.checked} onChange={e => onItemCheckChange(e, item)} />
        </UserControls.Col>
        <UserControls.Col xs={6}>
            <UserControls.Typography>
                {item.nome}
            </UserControls.Typography>
        </UserControls.Col>

        <UserControls.Col xs={6}>
            <UserControls.Typography>
                {item.cognome}
            </UserControls.Typography>
        </UserControls.Col>

        <UserControls.Col xs={6}>
            <UserControls.Typography>
                {item.codiceFiscale}
            </UserControls.Typography>
        </UserControls.Col>

        <UserControls.Col xs={5}>
            <UserControls.Typography>
                {formatUtils.formatDate(item.dataNascita)}
            </UserControls.Typography>
        </UserControls.Col>
    </UserControls.Row>
}