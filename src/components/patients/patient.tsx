// 'use client'

import { useRouter } from "next/router";
import { genders } from "../../configurations/genders";
import { usePatient } from "../../hooks/usePatient";
// import { usePatient } from "../../hooks/usePatient";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";

const Header = ({ onAddClick }: { onAddClick: () => void }) => <UserControls.Row>
    <UserControls.Col xs={12}>
        <UserControls.Typography.Text>
            Projects
        </UserControls.Typography.Text>
    </UserControls.Col>

    <UserControls.Col xs={12} style={{ textAlign: 'right' }}>
        <UserControls.Button icon={<AntdIcons.PlusOutlined />} onClick={onAddClick} />
    </UserControls.Col>
</UserControls.Row>

const ProjectItem = ({ onClick }: { onClick: (item: IProject) => void }) => (item: IProject) => {
    return <UserControls.Row onClick={e => { e.preventDefault(); e.stopPropagation(); onClick(item) }}>
        <UserControls.Col xs={12}>
            <UserControls.Typography.Text>
                {item.id}
            </UserControls.Typography.Text>
        </UserControls.Col>
    </UserControls.Row>
}

export const Patient = ({ patientId }: { patientId: string }) => {

    const { patient, loadingPatient } = usePatient(patientId);
    const { push } = useRouter();
    const onAddClick = () => {
        push(`/projects/create`)
    }
    const onClick = (item: IProject) => {

    }
    // const form = UserControls.Form.useForm()

    return <UserControls.Skeleton loading={loadingPatient}>
        <UserControls.Form layout="vertical">
            <UserControls.Row>
                <UserControls.Col xs={3}>
                    <UserControls.Avatar icon={<AntdIcons.UserOutlined />} />
                </UserControls.Col>
                <UserControls.Col xs={21}>
                    <UserControls.Row>
                        <UserControls.Col xs={6}>
                            <UserControls.Form.Item label={'Family name'}>
                                {patient?.familyName}
                            </UserControls.Form.Item>
                        </UserControls.Col>
                        <UserControls.Col xs={6}>
                            <UserControls.Form.Item label={'Gender'}>
                                {patient && patient.gender ? genders[patient.gender] : genders.unknown}
                            </UserControls.Form.Item>

                        </UserControls.Col>
                        <UserControls.Col xs={6}>
                            <UserControls.Form.Item label={'Blood group'}>
                                {patient?.bloodGroup}
                            </UserControls.Form.Item>
                        </UserControls.Col>
                    </UserControls.Row>

                    <UserControls.Row>
                        <UserControls.Col xs={6}>
                            <UserControls.Form.Item label={'Name'}>
                                {patient?.firstName}
                            </UserControls.Form.Item>
                        </UserControls.Col>
                        <UserControls.Col xs={6}>
                            <UserControls.Form.Item label={'Date of birth'}>
                                {patient?.dateOfBirth?.toISOString()}
                            </UserControls.Form.Item>
                        </UserControls.Col>
                        <UserControls.Col xs={6}>
                            <UserControls.Form.Item label={'Emergency phone'}>
                                {patient?.emergencyPhone}
                            </UserControls.Form.Item>
                        </UserControls.Col>
                    </UserControls.Row>
                    <UserControls.Row>
                        <UserControls.Form.Item label={'Notes'}>
                            {patient?.notes}
                        </UserControls.Form.Item>
                    </UserControls.Row>
                </UserControls.Col>
            </UserControls.Row>

            <UserControls.Row>
                <UserControls.Col xs={24}>
                    <UserControls.List
                        header={<Header onAddClick={onAddClick} />}
                        dataSource={patient?.projects}
                        renderItem={ProjectItem({ onClick })}
                    />

                </UserControls.Col>
            </UserControls.Row>
        </UserControls.Form>
    </UserControls.Skeleton>
}