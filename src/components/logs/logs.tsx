import { useEffect, useRef, useTransition } from "react";
import { useLogs } from "../../hooks/useLogs";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { useDebouncedCallback } from "../../utils/useDebouncedCallback";


const unixTimestampToDate = (ts: number | undefined) => {
    return new Date((ts || 0) * 1000)
}

export const Logs = () => {

    const levels = ['debug', 'info', 'warn', 'error'];
    const options = levels.map(l => ({ label: l, key: l, value: l }))

    const { logs, loadingLogs, fetchLogs } = useLogs();

    const [form] = UserControls.Form.useForm()
    const level = UserControls.Form.useWatch<logLevels>('level', form)
    const userId = UserControls.Form.useWatch<string>('userId', form)
    const controller = useRef<AbortController>();
    const [pendingFetchTransition, fetchLogsTransition] = useTransition();

    const getLogs = useDebouncedCallback(() => {
        fetchLogsTransition(() => {
            controller.current = new AbortController();
            fetchLogs(controller.current, level, userId);
        })
    }, 500);

    const reloadLogs = () => {
        return getLogs();
    }

    useEffect(() => {

        getLogs()
        return () => {
            controller.current && controller.current.abort();
        }
    }, [level, userId])


    const onClick = (item: ILogObj) => {

        const text = JSON.stringify(JSON.parse(item.meta.toString()), undefined, 2);

        UserControls.Modal.info({
            width: 'fit-content',
            title: item.message,
            content: <div>
                <p>{`Date: ${unixTimestampToDate(item.timestamp).toLocaleString()} `}</p>
                <p>{`UserId: ${item.userId} `}</p>
                <pre dangerouslySetInnerHTML={{ __html: text }}>
                </pre>
            </div>
        })

    }
    const onUserIdClick = (item: ILogObj) => {

        form.setFieldValue('userId', item.userId)

    }

    const Header = <UserControls.Row justify={'center'} align={'middle'}>
        <UserControls.Col xs={3}>
            Timestamp
        </UserControls.Col>
        <UserControls.Col xs={2}>
            Level
        </UserControls.Col>
        <UserControls.Col xs={5}>
            Message
        </UserControls.Col>
        <UserControls.Col xs={5}>
            UserId
        </UserControls.Col>
        <UserControls.Col xs={9}>
            Meta
        </UserControls.Col>
    </UserControls.Row>

    return <UserControls.Row>
        <UserControls.Col xs={24}>
            <UserControls.Form form={form} layout="inline" initialValues={{ level: 'debug', userId: '' }} style={{ marginBottom: 20 }}>
                <UserControls.Col xs={4}>
                    <UserControls.Form.Item name='level' label={'level'}>
                        <UserControls.Select
                            options={options}
                        />
                    </UserControls.Form.Item>
                </UserControls.Col>
                <UserControls.Col xs={6}>
                    <UserControls.Form.Item name='userId' label={'userId'}>
                        <UserControls.Input allowClear />
                    </UserControls.Form.Item>
                </UserControls.Col>
                <UserControls.Col xs={4}>
                    <UserControls.Form.Item label={'refresh'}>
                        <UserControls.Button
                            onClick={reloadLogs}
                            icon={<AntdIcons.ReloadOutlined />}
                        />
                    </UserControls.Form.Item>
                </UserControls.Col>
            </UserControls.Form>
        </UserControls.Col>
        <UserControls.Col xs={24}>
            <UserControls.List
                loading={loadingLogs}
                dataSource={logs}
                header={Header}
                renderItem={LogItem({ onClick, onUserIdClick })}
            />
        </UserControls.Col>
    </UserControls.Row >
}

const LogItem = ({ onClick, onUserIdClick }: { onClick: (item: ILogObj) => void, onUserIdClick: (item: ILogObj) => void }) => (item: ILogObj) => {

    const onIdClick: React.MouseEventHandler<any> = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onUserIdClick(item)

    }
    return (<UserControls.List.Item className="touchable" key={item.id} onClick={() => onClick(item)}>
        <UserControls.Col xs={24}>
            <UserControls.Row justify={'center'} align={'middle'}>
                <UserControls.Col xs={3}>
                    {unixTimestampToDate(item.timestamp).toLocaleString()}
                </UserControls.Col>
                <UserControls.Col xs={2}>
                    {item.level || ' - '}
                </UserControls.Col>
                <UserControls.Col xs={5}>
                    {item.message || ' - '}
                </UserControls.Col>
                <UserControls.Col xs={5} style={{ cursor: 'zoom-in' }} onClick={onIdClick}>
                    {item.userId || ' - '}
                </UserControls.Col>
                <UserControls.Col xs={9}>
                    <UserControls.Typography.Paragraph
                        ellipsis={{
                            rows: 3
                        }}>
                        {item.meta.toString()}
                    </UserControls.Typography.Paragraph>
                </UserControls.Col>
            </UserControls.Row>
        </UserControls.Col>
    </UserControls.List.Item>
    )
}