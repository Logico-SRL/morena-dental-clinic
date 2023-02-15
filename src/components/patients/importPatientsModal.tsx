import { useEffect, useState } from "react";
import { usePatients } from "../../hooks/usePatients";
import { AAnagrafica } from "../../repository/unoEntities/entities/AAnagrafica";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { formatUtils } from "../../utils/formatUtils";
import classnames from './patients.module.scss';

type PropType = {
    open: boolean,
    onCancel: () => void,
}


export const ImportPatientsModal = ({ open, onCancel }: PropType) => {

    const Form = UserControls.Form;
    const { searchExternalAnagrafica } = usePatients()

    const [form] = Form.useForm<IUnoAnagraficaSearchParams>();
    const [notif] = UserControls.notification.useNotification();
    const [users, setUsers] = useState<AAnagrafica[]>([]);

    useEffect(() => {
        if (!open) {
            setUsers([])
        }
    }, [open])

    const onSearchClick = async () => {
        const pars = form.getFieldsValue();
        const resp = await searchExternalAnagrafica(pars);
        setUsers(resp)
    }

    const onOk = () => {
        // form.validateFields().
        //     then(async (pat) => {
        //         notif.success({
        //             message: 'Done',
        //             description: 'Patient correctly saved',
        //             placement: 'bottomLeft'

        //         })
        //         onCancel();
        //     })
    }

    return <UserControls.Modal
        open={open}
        onCancel={onCancel}
        title={'Import Patients'}
        okText={'Import'}
        onOk={onOk}
        wrapClassName={classnames.importModalWrap}
    >
        <UserControls.Col xs={24}>
            <Form form={form} layout="vertical" initialValues={{ nome: '', cognome: '', codiceFiscale: '' }} >
                <UserControls.Row gutter={20}>
                    <UserControls.Col xs={7}>
                        <Form.Item name={'nome'} label={'name'}>
                            <UserControls.Input allowClear />
                        </Form.Item>
                    </UserControls.Col>
                    <UserControls.Col xs={7}>
                        <Form.Item name={'cognome'} label={'family name'}>
                            <UserControls.Input allowClear />
                        </Form.Item>
                    </UserControls.Col>
                    <UserControls.Col xs={7}>
                        <Form.Item name={'codiceFiscale'} label={'fiscal code'}>
                            <UserControls.Input allowClear />
                        </Form.Item>
                    </UserControls.Col>
                    <UserControls.Col xs={3}>
                        <Form.Item noStyle>
                            <UserControls.Button onClick={onSearchClick} icon={<AntdIcons.SearchOutlined />} style={{ marginTop: 24 }}>
                                Search
                            </UserControls.Button>
                        </Form.Item>
                    </UserControls.Col>
                    <UserControls.Col xs={24}>

                        <UserControls.List
                            header={<Header />}
                            renderItem={renderItem}
                            dataSource={users}
                        />

                    </UserControls.Col>
                </UserControls.Row>
            </Form>
        </UserControls.Col>
    </UserControls.Modal >
}

const Header = () => <UserControls.Row>
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

    <UserControls.Col xs={6}>
        <UserControls.Typography.Title level={5}>
            Birthdate
        </UserControls.Typography.Title>
    </UserControls.Col>
</UserControls.Row>

const renderItem = (item: AAnagrafica) => {
    return <UserControls.Row>
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

        <UserControls.Col xs={6}>
            <UserControls.Typography>
                {formatUtils.formatDate(item.dataNascita)}
            </UserControls.Typography>
        </UserControls.Col>
    </UserControls.Row>
}