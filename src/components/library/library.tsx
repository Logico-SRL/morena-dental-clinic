import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FunctionComponent, PropsWithChildren, useMemo, useRef, useState } from "react";
import { useLibrary } from "../../hooks/useLibrary";
import { useTags } from "../../hooks/useTags";
import UserControls from "../../userControls";
import classnames from './library.module.scss';

type PropType = {}



type RendererOptions = {
    router: AppRouterInstance
}

const TouchableRow: FunctionComponent<PropsWithChildren<{ onClick: () => void }>> = ({ children, onClick }) => {
    return <UserControls.Row className={classnames.touchableRow} onClick={onClick}>
        {children}
    </UserControls.Row>
}

const patientRenderer = (item: IPatientSearchResult, { router }: RendererOptions) => {
    return <TouchableRow onClick={() => router.push(`/patients/${item.id}`)}>
        <UserControls.Col xs={6}>
            {item.id}
        </UserControls.Col>
        <UserControls.Col xs={6}>
            {item.type}
        </UserControls.Col>
        <UserControls.Col xs={6}>
            {item.firstName}
        </UserControls.Col>
    </TouchableRow>
}
const projectRenderer = (item: IProjectSearchResult, { router }: RendererOptions) => {
    return <TouchableRow onClick={() => router.push(`/projects/${item.id}`)}>
        <UserControls.Col xs={6}>
            {item.id}
        </UserControls.Col>
        <UserControls.Col xs={6}>
            {item.type}
        </UserControls.Col>
        <UserControls.Col xs={6}>
            {item.title}
        </UserControls.Col>
    </TouchableRow>
}
const visitRenderer = (item: IVisitSearchResult, { router }: RendererOptions) => {
    return <TouchableRow onClick={() => router.push(`/projects/${item.projectId}/visits/${item.id}`)}>
        <UserControls.Col xs={6}>
            {item.id}
        </UserControls.Col>
        <UserControls.Col xs={6}>
            {item.type}
        </UserControls.Col>
        <UserControls.Col xs={6}>
            {item.title}
        </UserControls.Col>
    </TouchableRow>
}

const searchResulRenderer = {
    patient: patientRenderer,
    project: projectRenderer,
    visit: visitRenderer
}

export const Library: React.FunctionComponent<PropType> = ({ }) => {


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

    const { searchEntities } = useLibrary()
    const { searchTags, getTag } = useTags()

    const abortController = useRef<AbortController>()

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {

        const val = e.target.value;
        setInputValue(val);
        setTagInputValue('')

        if (abortController.current) {
            abortController.current.abort()
        }

        if (!val || val.length < 4) {
            return setSearchResults([])
        }

        abortController.current = new AbortController();
        searchEntities(val, abortController.current.signal).then(res => {
            setSearchResults(res.data)
        })

    }

    const onTagInputChange = (val: string) => {

        // const val = e.target.value;
        setTagInputValue(val)
        setInputValue('')

        if (abortController.current) {
            abortController.current.abort()
        }

        if (!val || val.length < 3) {
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
            <UserControls.Form.Item label='Full text search'>
                <UserControls.Input onChange={onInputChange} value={inputValue} />
            </UserControls.Form.Item>

        </UserControls.Col>
        <UserControls.Col xs={12}>
            <UserControls.Form.Item label='Tag search'>
                <UserControls.AutoComplete

                    dataSource={tagDataSource}
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