import { FormInstance } from "antd";
import { useState } from "react";
import { gendersArr, gendersKeysType } from "../../configurations/genders";
import { useTags } from "../../hooks/useTags";
import { useWebLogger } from "../../hooks/useWebLogger";
import UserControls from "../../userControls";


type PropType = {
    form: FormInstance
}
export const PatientForm = ({ form }: PropType) => {

    const Form = UserControls.Form;

    const { searchTags } = useTags()
    const [searchTagsResults, setSearchTagsResults] = useState<ITag[]>([])
    const [searchingTags, setSearchingTags] = useState(false);
    const logger = useWebLogger();

    // const abortController = useRef<AbortController>();

    const onTagSearch = (search: string, abortController: AbortController) => {
        setSearchingTags(true)

        searchTags(search, abortController.signal)
            .then(res => {
                setSearchTagsResults(res.data)
            }).catch(ex => {
                logger.error('getTags err', ex);
                setSearchTagsResults([])
            }).finally(() => {
                setSearchingTags(false)
            })
    }

    return <Form form={form} labelCol={{ span: 6 }}>
        <Form.Item name={'id'} label={'Id'} >
            <UserControls.Input disabled />
        </Form.Item>
        <Form.Item name={'firstName'} label={'First Name'}>
            <UserControls.Input />
        </Form.Item>

        <Form.Item name={'familyName'} label={'Family Name'}>
            <UserControls.Input />
        </Form.Item>

        <Form.Item name={'fiscalCode'} label={'Fiscal Code'}>
            <UserControls.Input style={{ textTransform: 'uppercase' }} />
        </Form.Item>

        <Form.Item name={'age'} label={'Age'}>
            <UserControls.InputNumber />
        </Form.Item>

        <Form.Item name={'dateOfBirth'} label={'Date of birth'}>
            <UserControls.DatePicker />
        </Form.Item>

        <Form.Item name={'bloodGroup'} label={'Blood group'}>
            <UserControls.Input />
        </Form.Item>

        <Form.Item name={'emergencyPhone'} label={'Emergency phone'}>
            <UserControls.Input placeholder="+39 " />
        </Form.Item>

        <Form.Item label="Tags" name="tags" shouldUpdate={true}>
            <UserControls.TagListSelect
                onSearch={onTagSearch}
                searchTags={searchTagsResults}
                searching={searchingTags}
            />
        </Form.Item>

        <Form.Item name={'notes'} label={'Notes'}>
            <UserControls.Input.TextArea rows={8} />
        </Form.Item>

        <Form.Item name={'gender'} label={'Gender'} initialValue={'unknown' as gendersKeysType}>
            <UserControls.Radio.Group>
                {gendersArr.map(gender => (
                    <UserControls.Radio key={gender.key} value={gender.key}>
                        {gender.value}
                    </UserControls.Radio>
                ))}
            </UserControls.Radio.Group>
        </Form.Item>
    </Form>
}