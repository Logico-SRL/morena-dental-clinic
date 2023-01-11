// 'use client'

import { RadioChangeEvent } from "antd";
import React from "react";
import { agesArr } from "../../configurations/ages";
import UserControls from "../../userControls";


type PropType = {
    submitSearch: (searchParams: IPatientSearchParams) => void;
}

export const PatientsFilter: React.FunctionComponent<PropType> = ({ submitSearch }) => {

    const [filters, setFilters] = React.useState<IPatientSearchParams>({})

    const onRadioChange = (e: RadioChangeEvent) => {
        setFilters(f => ({ ...f, age: e.target.value }));
    }

    return <UserControls.Row>
        <UserControls.Col xs={24}>
            <UserControls.Typography.Text>
                Age
            </UserControls.Typography.Text>
        </UserControls.Col>
        <UserControls.Col xs={24}>
            <UserControls.Row>
                <UserControls.Radio.Group onChange={onRadioChange}>
                    {agesArr.map(age => (
                        <UserControls.Radio key={age.key} value={age.key}>
                            {age.value}
                        </UserControls.Radio>
                    ))}

                </UserControls.Radio.Group>
                <UserControls.Col>

                </UserControls.Col>

            </UserControls.Row>
        </UserControls.Col>
        <UserControls.Col xs={24}>
            <UserControls.Button onClick={e => submitSearch(filters)}>
                Search
            </UserControls.Button>
        </UserControls.Col>
    </UserControls.Row>
}