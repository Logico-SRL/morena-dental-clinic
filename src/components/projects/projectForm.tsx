import { FormInstance } from "antd";
import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { usePatients } from "../../hooks/usePatients";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { NewCategoryModal } from "../categories/newCategoryModal";
import { NewSubCategoryModal } from "../categories/newSubCategoryModal";


type PropType = {
    form: FormInstance<IProject>,
    onSave: (proj: IProject) => void,
    loading: boolean,
    submitText: string,
    initialProject?: IProject
}



export const ProjectForm = ({ form, onSave, loading, submitText, initialProject }: PropType) => {

    const Form = UserControls.Form;
    const [categoryForm] = Form.useForm<IProjectCategory>();
    const [subCategoryForm] = Form.useForm<IProjectCategory>();

    const { patients } = usePatients()
    const { categories } = useCategories()

    const patientsOptions: AutoCompleteOptionType<IPatient>[] = patients.map(p => {

        const val = `${p.firstName} - ${p.familyName}. ${p.fiscalCode}`

        return {
            label: val,
            value: val,
            id: p.id,
            item: p
        }
    })

    const categoriesOptions: AutoCompleteOptionType<IProjectCategory>[] = categories.map(cat => ({
        value: cat.name,
        label: cat.name,
        id: cat.id,
        item: cat
        // label: cat.name
    }))

    const [selectedCat, setSelectedCat] = useState<IProjectCategory>();

    const subCategoriesOptions: AutoCompleteOptionType<IProjectCategory>[] = selectedCat ? selectedCat.childrenCategories.map(cat => ({
        value: cat.name,
        label: cat.name,
        id: cat.id,
        item: cat
        // label: cat.name
    })) : []

    const onFinish = (e: any) => {
        // debugger;
        const d = form.getFieldsValue();

        console.info('onFinish d:', d)

        form.validateFields()
            .then((vals) => {
                const patient = patients.find(p => p.id == vals.patient.id)
                if (!patient) {
                    console.error(`patient ${vals.patient.id} not found`)
                } else {
                    vals.patient = patient;
                    onSave(vals);
                }
                console.info('onFinish success', vals);
            }).catch(err => {
                console.error('onFinish error', err)
            })
    };

    const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
    const [showNewSubCategoryForm, setShowNewSubCategoryForm] = useState(false);
    const [categorySearch, setCategorySearch] = useState('');
    const [subCategorySearch, setSubCategorySearch] = useState('');

    const addCategory = () => {
        categoryForm.setFieldsValue({
            parentCategory: undefined,
            name: categorySearch,
            childrenCategories: [],
        })
        setShowNewCategoryForm(true);
    }
    const addSubCategory = () => {

        subCategoryForm.setFieldsValue({
            name: subCategorySearch,
            childrenCategories: [],
        })

        setShowNewSubCategoryForm(true);


    }
    const onPatientSelect = (_: any, { item }: AutoCompleteOptionType<IPatient>) => {
        form.setFieldValue('patient', item)
    }

    const onCategorySelect = (_: any, { item }: AutoCompleteOptionType<IProjectCategory>) => {
        setSelectedCat(item);
        form.setFieldValue('category', item)
    }

    const onSubCategorySelect = (_: any, { item }: AutoCompleteOptionType<IProjectCategory>) => {
        form.setFieldValue('subCategory', item)
    }


    return <UserControls.Skeleton loading={loading}>
        <Form form={form} labelCol={{ span: 6 }}>
            <Form.Item name={'id'} label={'Id'} required>
                <UserControls.Input disabled />
            </Form.Item>
            <Form.Item name={'title'} label={'Title'} required rules={[{ required: true }]}>
                <UserControls.Input />
            </Form.Item>


            <Form.Item name={['patient', 'id']} label={'Patient'} required
                rules={[{ required: true, message: 'required value' }]}
                initialValue={initialProject && initialProject.patient}
            >

                {/* <Form.Item noStyle>
                {({ getFieldValue }) => {
                    const val = getFieldValue(['patient', 'id'])
                    console.info('val', val)

                    return <Form.Item name={['patient', 'id']} label={'Patient'} required
                        rules={[{ required: true, message: 'required value' }]}
                        initialValue={initialProject && initialProject.patient}
                    >
                        <UserControls.AutoComplete
                            value={patientsOptions.find(o => o.id === val)}
                            options={patientsOptions}
                            onSelect={onPatientSelect}
                            filterOption={(inputValue, option) =>
                                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </Form.Item>
                }} */}

                {/* <UserControls.Row gutter={20}>
                    <UserControls.Col flex={1}> */}

                <UserControls.AutoComplete
                    options={patientsOptions}
                    onSelect={onPatientSelect}
                    filterOption={(inputValue, option) =>
                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
                {/* </UserControls.Col>
                </UserControls.Row> */}
                {/* <UserControls.Select options={} /> */}
            </Form.Item>

            <Form.Item name={['category', 'id']} label={'Category'} required rules={[{ required: true, message: 'required value' }]}>
                <UserControls.Row gutter={20}>
                    <UserControls.Col flex={1}>
                        <UserControls.AutoComplete
                            searchValue={categorySearch}
                            onSearch={setCategorySearch}
                            options={categoriesOptions}
                            onSelect={onCategorySelect}
                            filterOption={(inputValue, option) =>
                                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </UserControls.Col>
                    <UserControls.Col>
                        <UserControls.Button icon={<AntdIcons.PlusOutlined />} onClick={addCategory} />
                    </UserControls.Col>
                </UserControls.Row>
            </Form.Item>

            <Form.Item name={['subCategory', 'id']} label={'Subcategory'}>
                <UserControls.Row gutter={20}>
                    <UserControls.Col flex={1}>
                        <UserControls.AutoComplete
                            searchValue={subCategorySearch}
                            onSearch={setSubCategorySearch}
                            disabled={!selectedCat}
                            options={subCategoriesOptions}
                            onSelect={onSubCategorySelect}
                            filterOption={(inputValue, option) =>
                                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </UserControls.Col>
                    <UserControls.Col>
                        <UserControls.Button
                            disabled={!selectedCat}
                            icon={<AntdIcons.PlusOutlined />} onClick={addSubCategory} />
                    </UserControls.Col>
                </UserControls.Row>

            </Form.Item>

            <Form.Item name={'medicalHistory'} label={'Medical history'}>
                <UserControls.Input.TextArea rows={5} />
            </Form.Item>

            <Form.Item name={'notes'} label={'Notes'}>
                <UserControls.Input.TextArea rows={5} />
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
                <UserControls.Button size="large" type="primary" onClick={onFinish}>
                    {submitText}
                </UserControls.Button>
            </Form.Item>

        </Form>
        <NewCategoryModal open={showNewCategoryForm} onCancel={() => setShowNewCategoryForm(false)} form={categoryForm} />
        <NewSubCategoryModal open={showNewSubCategoryForm} onCancel={() => setShowNewSubCategoryForm(false)} form={subCategoryForm} parentCategory={selectedCat} />

    </UserControls.Skeleton>
}