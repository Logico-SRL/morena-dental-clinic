import { genders } from "../../configurations/genders";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";

export const PatientInfo = ({ patient }: { patient: IPatient | undefined }) => {
    return <UserControls.Row>
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
                <UserControls.Col xs={24}>
                    <UserControls.Form.Item label={'Notes'}>
                        {patient?.notes}
                    </UserControls.Form.Item>
                </UserControls.Col>
                <UserControls.Col xs={24}>
                    <UserControls.Form.Item label={'Tags'}>
                        <UserControls.TagList value={patient?.tags} />
                    </UserControls.Form.Item>
                </UserControls.Col>
            </UserControls.Row>
        </UserControls.Col>
    </UserControls.Row>
}