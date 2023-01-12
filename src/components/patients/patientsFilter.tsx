// 'use client'

import { DatePickerProps, RadioChangeEvent } from "antd";
import React from "react";
import { agesArr } from "../../configurations/ages";
import { gendersArr } from "../../configurations/genders";
import UserControls from "../../userControls";


type PropType = {
    submitSearch: (searchParams: IPatientSearchParams) => void;
}

export const PatientsFilter: React.FunctionComponent<PropType> = ({ submitSearch }) => {

    const [filters, setFilters] = React.useState<IPatientSearchParams>({})

    const onAgeRadioChange = (e: RadioChangeEvent) => {
        setFilters(f => ({ ...f, age: e.target.value }));
    }

    const onGenderRadioChange = (e: RadioChangeEvent) => {
        setFilters(f => ({ ...f, gender: e.target.value }));
    }

    const onFromDateChanged: DatePickerProps['onChange'] = (d, dateString) => {
        setFilters(f => ({ ...f, fromVisitDate: d?.toDate() || undefined }));
    }

    const onToDateChanged: DatePickerProps['onChange'] = (d, dateString) => {

        setFilters(f => ({ ...f, toVisitDate: d?.toDate() || undefined }));
    }

    return <UserControls.Row gutter={[20, 20]}>
        <UserControls.Col xs={24}>
            <UserControls.Typography.Text strong>
                Age
            </UserControls.Typography.Text>
        </UserControls.Col>
        <UserControls.Col xs={24}>
            <UserControls.Radio.Group onChange={onAgeRadioChange}>
                {agesArr.map(age => (
                    <UserControls.Radio key={age.key} value={age.key}>
                        {age.value}
                    </UserControls.Radio>
                ))}

            </UserControls.Radio.Group>
        </UserControls.Col>
        <UserControls.Col xs={24}>
            <UserControls.Typography.Text strong>
                Gender
            </UserControls.Typography.Text>
        </UserControls.Col>
        <UserControls.Col xs={24}>
            <UserControls.Radio.Group onChange={onGenderRadioChange}>
                {gendersArr.map(gender => (
                    <UserControls.Radio key={gender.key} value={gender.key}>
                        {gender.value}
                    </UserControls.Radio>
                ))}

            </UserControls.Radio.Group>
        </UserControls.Col>
        <UserControls.Col xs={24}>
            <UserControls.Typography.Text strong>
                Last visit date
            </UserControls.Typography.Text>
        </UserControls.Col>
        <UserControls.Col xs={24}>
            <UserControls.Space size={'large'}>
                <UserControls.Space>
                    <UserControls.Typography.Text>
                        From
                    </UserControls.Typography.Text>
                    <UserControls.DatePicker onChange={onFromDateChanged} />
                </UserControls.Space>

                <UserControls.Space>
                    <UserControls.Typography.Text>
                        To
                    </UserControls.Typography.Text>
                    <UserControls.DatePicker onChange={onToDateChanged} />
                </UserControls.Space>
            </UserControls.Space>
        </UserControls.Col>

        <UserControls.Col xs={24}>
            <UserControls.Button size="large" onClick={e => submitSearch(filters)} style={{ margin: '20px auto', display: 'block', minWidth: 100 }}>
                <UserControls.Typography.Text strong >
                    Search
                </UserControls.Typography.Text>
            </UserControls.Button>
        </UserControls.Col>
    </UserControls.Row>
}