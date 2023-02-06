import { FunctionComponent, useMemo, useRef } from "react";
import UserControls from "../..";
import { useDebouncedCallback } from "../../../utils/useDebouncedCallback";
import { AntdIcons } from "../../icons";
import classnames from './taglist.module.scss';

type PropType = {
    value?: ITag[],
    onChange?: (values: ITag[]) => void,
    searchTags: ITag[],
    // onAdd: (t: ITag) => void,
    // onRemove: (t: ITag) => void,
    onSearch: (s: string, abortController: AbortController) => void,
    searching: boolean,
}

const TagListSelect: FunctionComponent<PropType> = ({
    value,
    searchTags,
    // onAdd,
    // onRemove,
    onSearch,
    searching,
    onChange
}) => {

    const options = useMemo(() => {
        return searchTags.map(s => ({
            label: s.tag,
            value: s.tag,
            item: s
        }))
    }, [searchTags])

    const autoCompleteVal = useRef('')

    const onAddClick = () => {
        if (!autoCompleteVal.current || autoCompleteVal.current.trim() === '') {
            return;
        }

        const item = {
            tag: autoCompleteVal.current,
            date: undefined,
            patients: [],
            projects: [],
            visits: [],
            pending: true
        }

        // onAdd()
        onTagSelect('', { item })
        // onChange && onChange([tag]);
    }

    const onTagSelect = (_: string, { item }: { item: ITag }) => {
        onChange && onChange((value || []).concat({
            ...item,
            pending: true
        }))
    }

    const onTagRemove = (tag: ITag) => {
        onChange && onChange((value || []).filter(t => t.tag != tag.tag))
    }

    const abortController = useRef<AbortController>(new AbortController());

    const onInternalSearch = useDebouncedCallback((val: string) => {

        if (abortController.current) {
            abortController.current.abort();
        }

        abortController.current = new AbortController();

        onSearch(val, abortController.current)
    }, 200);

    return <UserControls.Row className={classnames.container}>
        <UserControls.Col xs={12} className={classnames.tagsContainer}>
            {(value || []).map(tag => <UserControls.Tag
                key={tag.tag}
                closable
                onClose={() => onTagRemove(tag)}
                color={tag.date ? tag.pending ? 'yellow' : 'success' : 'processing'}
            >
                {tag.tag}
            </UserControls.Tag>)}
        </UserControls.Col>
        <UserControls.Col xs={12}>
            <UserControls.AutoComplete
                onSearch={onInternalSearch}
                onSelect={onTagSelect}
                autoClearSearchValue
                options={options}
            >
                <UserControls.Input.Search onChange={e => autoCompleteVal.current = e.target.value} enterButton={<UserControls.Button onClick={onAddClick} type="primary" disabled={searching || searchTags.length > 0} loading={searching} size="small" icon={<AntdIcons.TagOutlined />}>Add</UserControls.Button>} />
            </UserControls.AutoComplete>
        </UserControls.Col>

    </UserControls.Row>
}

export default TagListSelect;