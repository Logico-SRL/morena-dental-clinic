import { FormInstance } from "antd";
import { useMemo, useRef, useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useTags } from "../../hooks/useTags";
import { useWebLogger } from "../../hooks/useWebLogger";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { NewCategoryModal } from "../categories/newCategoryModal";
import { NewSubCategoryModal } from "../categories/newSubCategoryModal";
import { BackButton } from "../userControls/backButton";


type PropType = {
    form: FormInstance<IMacroProject>,
    onSave: (proj: IMacroProject) => void,
    loading: boolean,
    submitText: string,
    onBack: () => void
}



export const MacroProjectForm = ({ form, onSave, loading, submitText, onBack }: PropType) => {

    const Form = UserControls.Form;
    const [categoryForm] = Form.useForm<IProjectCategory>();
    const [subCategoryForm] = Form.useForm<IProjectCategory>();

    const { categories } = useCategories()
    const logger = useWebLogger();


    const categoriesOptions: SearchSelectOptionType<IProjectCategory>[] = categories.map(cat => ({
        value: cat.id,
        label: cat.name,
        // id: cat.id,
        item: cat
        // label: cat.name
    }))

    // const [selectedCat, setSelectedCat] = useState<IProjectCategory>();
    const selectedCatId = Form.useWatch(['category', 'id'], form);
    const selectedCat = useMemo(() => {
        return categories.find(c => c.id === selectedCatId)
    }, [selectedCatId, categories])

    const subCategoriesOptions: SearchSelectOptionType<IProjectCategory>[] = selectedCat ? selectedCat.childrenCategories.map(cat => ({
        value: cat.id,
        label: cat.name,
        // id: cat.id,
        item: cat
        // label: cat.name
    })) : []

    const onFinish = (e: any) => {
        // debugger;
        const d = form.getFieldsValue();

        // console.info('onFinish d:', d)

        form.validateFields()
            .then((vals) => {
                onSave(vals);
                // console.info('onFinish success', vals);
            }).catch(err => {
                logger.error('projectForm onFinish error', err)
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
    const onPatientSelect = (_: any, { item }: SearchSelectOptionType<IPatient>) => {
        form.setFieldValue('patient', item)
    }

    const onCategorySelect = (_: any, { item }: SearchSelectOptionType<IProjectCategory>) => {
        // setSelectedCat(item);
        form.setFieldValue('category', item)
        form.setFieldValue('subCategory', null)
    }

    const onSubCategorySelect = (_: any, { item }: SearchSelectOptionType<IProjectCategory>) => {
        form.setFieldValue('subCategory', item)
    }

    const filterOnLabel = (inputValue: string, option?: SearchSelectOptionType<any>) => option!.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1

    const { searchTags } = useTags()
    const [searchTagsResults, setSearchTagsResults] = useState<ITag[]>([])
    const [searchingTags, setSearchingTags] = useState(false);

    const abortController = useRef<AbortController>();

    const onTagSearch = (search: string, abortController: AbortController) => {
        setSearchingTags(true)

        searchTags(search, abortController.signal)
            .then(res => {
                setSearchTagsResults(res.data)
            }).catch(ex => {
                logger.error('projectForm getTags err', ex);
                setSearchTagsResults([])
            }).finally(() => {
                setSearchingTags(false)
            })
    }

    return <UserControls.Skeleton loading={loading}>
        <Form form={form} labelCol={{ span: 6 }} >
            <Form.Item name={'id'} label={'Id'} required>
                <UserControls.Input disabled />
            </Form.Item>
            <Form.Item name={'title'} label={'Title'} required rules={[{ required: true }]}>
                <UserControls.Input />
            </Form.Item>



            <Form.Item label={'Category'}>
                <Form.Item name={['category', 'id']} required rules={[{ required: true, message: 'required value' }]}
                    style={{ display: 'inline-block', width: 'calc(80% - 8px)', margin: 0 }}>
                    <UserControls.Select
                        showSearch
                        allowClear
                        // searchValue={categorySearch}
                        // onSearch={setCategorySearch}
                        options={categoriesOptions}
                        onSelect={onCategorySelect}
                        filterOption={filterOnLabel}
                    />
                </Form.Item>
                <Form.Item style={{ display: 'inline-block', width: 'calc(20%)', margin: '0 0 0 8px' }}>
                    <UserControls.Button icon={<AntdIcons.PlusOutlined />} onClick={addCategory} />
                </Form.Item>
            </Form.Item>

            <Form.Item label={'Subcategory'}>

                <Form.Item
                    style={{ display: 'inline-block', width: 'calc(80% - 8px)', margin: 0 }}
                    shouldUpdate={true}
                >
                    {({ getFieldValue }) => <Form.Item name={['subCategory', 'id']}>
                        <UserControls.Select
                            showSearch
                            allowClear
                            // searchValue={subCategorySearch}
                            // onSearch={setSubCategorySearch}
                            disabled={!getFieldValue(['category', 'id'])}
                            options={subCategoriesOptions}
                            onSelect={onSubCategorySelect}
                            filterOption={filterOnLabel}
                        />
                    </Form.Item>
                    }

                </Form.Item>
                <Form.Item style={{ display: 'inline-block', width: 'calc(20%)', margin: '0 0 0 8px' }}>

                    <UserControls.Button
                        disabled={!selectedCat}
                        icon={<AntdIcons.PlusOutlined />} onClick={addSubCategory} />
                </Form.Item>
            </Form.Item>

            {/* <Form.Item label="Tags" name="tags" shouldUpdate={true}>
                <UserControls.TagListSelect
                    onSearch={onTagSearch}
                    searchTags={searchTagsResults}
                    searching={searchingTags}
                />

            </Form.Item> */}

            {/* <Form.Item name={'notes'} label={'Notes'}>
                <UserControls.Input.TextArea rows={5} />
            </Form.Item> */}

            <Form.Item style={{ textAlign: 'center' }}>
                <UserControls.Space>
                    <BackButton onBack={onBack} />

                    <UserControls.Button size="large" type="primary" onClick={onFinish}>
                        {submitText}
                    </UserControls.Button>
                </UserControls.Space>
            </Form.Item>

        </Form>
        <NewCategoryModal open={showNewCategoryForm} onCancel={() => setShowNewCategoryForm(false)} form={categoryForm} />
        <NewSubCategoryModal open={showNewSubCategoryForm} onCancel={() => setShowNewSubCategoryForm(false)} form={subCategoryForm} parentCategory={selectedCat} />

    </UserControls.Skeleton>
}