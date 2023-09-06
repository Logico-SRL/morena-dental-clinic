import { useRouter } from "next/navigation";
import { ChangeEventHandler, useMemo, useRef, useState } from "react";
import { useSearch } from "../../hooks/useSearch";
import { useTags } from "../../hooks/useTags";
import UserControls from "../../userControls";
import { useDebouncedCallback } from "../../utils/useDebouncedCallback";
import { searchResulRenderer } from "./renderers/searchResultRenderer";

type PropType = {}

const minFullTextSearchLength = 4;
const minTagTextSearchLength = 2;

export const Search: React.FunctionComponent<PropType> = ({ }) => {


    const router = useRouter();


    const itemRenderer = (item: ISearchResult, index: number) => {
        return searchResulRenderer[item.type](item as any, { router })
    }
    // const [form] = UserControls.Form.useForm();

    const [inputValue, setInputValue] = useState('');
    const [tagInputValue, setTagInputValue] = useState('');
    const [searchResults, setSearchResults] = useState<ISearchResult[]>([])
    const [tagSearchResults, setTagSearchResults] = useState<ITag[]>([])

    const tagDataSource = useMemo(() => {
        return tagSearchResults.map(t => ({ value: t.tag, text: t.tag }))
    }, [tagSearchResults])

    const { searchEntities } = useSearch()
    const { searchTags, getTag } = useTags()

    const abortController = useRef<AbortController>()

    const onFullTextInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {

        const val = e.target.value;
        setInputValue(val);
        setTagInputValue('')

        if (abortController.current) {
            abortController.current.abort()
        }

        if (!val || val.length < minFullTextSearchLength) {
            return setSearchResults([])
        }

        searchFullTextDebounced(val)

    }

    const searchFullTextDebounced = useDebouncedCallback((val: string) => {
        abortController.current = new AbortController();
        searchEntities(val, abortController.current.signal).then(res => {
            setSearchResults(res.data)
        })
    }, 200)

    const onTagInputChange = (val: string) => {

        // const val = e.target.value;
        setTagInputValue(val)
        setInputValue('')

        if (abortController.current) {
            abortController.current.abort()
        }

        if (!val || val.length < minTagTextSearchLength) {
            return setSearchResults([])
        }

        abortController.current = new AbortController();

        searchTags(val, abortController.current.signal).then(res => {
            setTagSearchResults(res.data)
        })

    }

    const onTagSelected = (value: string) => {
        if (!value) {
            setSearchResults([])
        }

        if (abortController.current) {
            abortController.current.abort()
        }

        abortController.current = new AbortController();
        getTag(value, abortController.current.signal).then(res => {

            const patsRes: IPatientSearchResult[] = res.data?.patients?.map(p => ({ ...p, type: 'patient' })) || []
            const projsRes: IProjectSearchResult[] = res.data?.projects?.map(p => ({ ...p, type: 'project' })) || []
            const visitsRes: IVisitSearchResult[] = res.data?.visits?.map(p => ({ ...p, type: 'visit' })) || []

            const arr: ISearchResult[] = [];
            patsRes.forEach(el => arr.push(el));
            projsRes.forEach(el => arr.push(el));
            visitsRes.forEach(el => arr.push(el));
            setSearchResults(arr);
        })
    }

    return <UserControls.Row gutter={20}>
        <UserControls.Col xs={12}>
            <UserControls.Form.Item
                label='Full text search' >
                <UserControls.Input placeholder={`min length ${minFullTextSearchLength} chars`}
                    onChange={onFullTextInputChange}
                    value={inputValue}
                />
            </UserControls.Form.Item>

        </UserControls.Col>
        <UserControls.Col xs={12}>
            <UserControls.Form.Item label='Tag search'>
                <UserControls.AutoComplete
                    placeholder={`min length ${minTagTextSearchLength} chars`}
                    options={tagDataSource}
                    onSearch={onTagInputChange}
                    onChange={onTagSelected}
                />
            </UserControls.Form.Item>

        </UserControls.Col>
        <UserControls.Col xs={24}>
            <UserControls.List
                dataSource={searchResults}
                renderItem={itemRenderer}
            />
        </UserControls.Col>

    </UserControls.Row>
}