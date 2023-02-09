// 'use client'
import { DatePickerProps, RadioChangeEvent } from "antd";
import { Dayjs } from 'dayjs';
import React, { SetStateAction } from "react";
import { agesArr } from "../../configurations/ages";
import { gendersArr } from "../../configurations/genders";
import UserControls from "../../userControls";


type PropType = {
    reset: () => void;
    filters: IPatientSearchParams,
    setFilters: Dispatch<SetStateAction<IPatientSearchParams>>
}

export const PatientsFilter: React.FunctionComponent<PropType> = ({ reset, filters, setFilters }) => {

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
    // const resetFilters = () => {
    //     setFilters({})
    //     submitSearch({});
    // }

    return <UserControls.Row gutter={[20, 20]}>
        <UserControls.Col xs={24}>
            <UserControls.Typography.Text strong>
                Age
            </UserControls.Typography.Text>
        </UserControls.Col>
        <UserControls.Col xs={24}>
            <UserControls.Radio.Group value={filters.age} onChange={onAgeRadioChange}>
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
            <UserControls.Radio.Group value={filters.gender} onChange={onGenderRadioChange}>
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
                    <UserControls.DatePicker disabled value={filters.fromVisitDate ? new Dayjs(filters.fromVisitDate) : null} onChange={onFromDateChanged} />
                </UserControls.Space>

                <UserControls.Space>
                    <UserControls.Typography.Text>
                        To
                    </UserControls.Typography.Text>
                    <UserControls.DatePicker disabled value={filters.toVisitDate ? new Dayjs(filters.toVisitDate) : null} onChange={onToDateChanged} />
                </UserControls.Space>
            </UserControls.Space>
        </UserControls.Col>

        <UserControls.Col xs={24} style={{ textAlign: 'center' }}>
            <UserControls.Space >
                <UserControls.Button size="large" onClick={reset} >
                    <UserControls.Typography.Text strong >
                        Reset
                    </UserControls.Typography.Text>
                </UserControls.Button>
                {/* <UserControls.Button size="large" onClick={e => submitSearch(filters)}>
                    <UserControls.Typography.Text strong >
                        Search
                    </UserControls.Typography.Text>
                </UserControls.Button> */}
            </UserControls.Space>
        </UserControls.Col>
    </UserControls.Row>
}