import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { usePubMed } from "../../hooks/usePubMed";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { TouchableRow } from "../userControls/touchableRow";
import { LibraryModal } from "./libraryModal";

type PropType = {}

const minTextSearchLength = 3;
const paginationPageSize = 10;
const fetchTake = 50;

export const SearchOnline: React.FunctionComponent<PropType> = ({ }) => {

    const router = useRouter();
    const { fetchArticles, fetchingArticles } = usePubMed();
    const [isPending, startTransition] = useTransition();

    const [libraryModalOpen, setLibraryModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState<IPubMedSummary>();

    const onClick = (item: IPubMedSummary) => {
        setModalItem(item)
        setLibraryModalOpen(true)
    }

    const itemRenderer = (item: IPubMedSummary, index: number) => {
        // return searchResulRenderer[item.type](item as any, { router })
        return <TouchableRow onClick={() => onClick(item)}>
            <UserControls.Col xs={4}>
                {item.uid}
            </UserControls.Col>
            <UserControls.Col xs={20}>
                {item.title}
            </UserControls.Col>
        </TouchableRow>;
    }

    const [searchResult, setSearchResult] = useState<IPubMedResponse>({
        search: {
            count: '0',
            retmax: '0',
            retstart: '0',
            idlist: [],
            translationset: [],
            translationstack: [],
            querytranslation: '',
        },
        summary: {
            uids: [] as any
        }
    })

    type PaginationType = {
        currPage: number,
        items: {
            [page: number]: IPubMedSummary[]
        }
    }

    const [pagination, setPagination] = useState<PaginationType>({
        currPage: 1, items: {}
    })

    useEffect(() => {
        const retItems = searchResult.summary.uids.map(uid => searchResult.summary[uid])
        const pag: PaginationType = {
            currPage: 1,
            items: {}
        }
        let pageNum = 1;
        let it = retItems.splice(0, Math.min(paginationPageSize, retItems.length))

        while (it.length > 0) {
            pag.items[pageNum] = it;
            it = retItems.splice(0, Math.min(paginationPageSize, retItems.length))
            pageNum++;
        }

        setPagination(pag);

    }, [searchResult])

    const [form] = UserControls.Form.useForm();

    const onFinish = async ({ term }: { term: string }) => {
        const resp = await fetchArticles(term, fetchTake)
        setSearchResult(resp)
    };

    // const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = async (page: number, pageSize: number) => {
        if (pagination.items[page]) {
            setPagination(p => ({
                currPage: page,
                items: p.items
            }))
        } else {
            const term = form.getFieldValue('term');
            const restartingFrom = (page - 1) * pageSize;
            const data = await fetchArticles(term, fetchTake, restartingFrom);
            const retItems = data.summary.uids.map(uid => data.summary[uid])
            const pag: PaginationType = { currPage: page, items: { ...pagination.items } }
            let pageNum = page;
            let it = retItems.splice(0, Math.min(paginationPageSize, retItems.length))

            while (it.length > 0) {
                pag.items[pageNum] = it;
                it = retItems.splice(0, Math.min(paginationPageSize, retItems.length))
                pageNum++;
            }

            setPagination(pag);
        }

    }

    return <UserControls.Form form={form} onFinish={onFinish}>
        <UserControls.Row gutter={20}>
            <UserControls.Col xs={22}>
                <UserControls.Form.Item
                    initialValue={''}
                    name={'term'}
                    label='Search term'
                    rules={[{ min: minTextSearchLength, message: `min text search length: ${minTextSearchLength}` }]} >
                    <UserControls.Input allowClear />
                </UserControls.Form.Item>
            </UserControls.Col>
            <UserControls.Col xs={2}>
                <UserControls.Button htmlType="submit" icon={<AntdIcons.SearchOutlined />} />
            </UserControls.Col>
            <UserControls.Col xs={24}>
                <UserControls.List
                    loading={fetchingArticles}
                    pagination={{
                        total: +searchResult.search.count,
                        pageSize: paginationPageSize,
                        onChange: onPageChange,
                        current: pagination.currPage
                    }}
                    dataSource={pagination.items[pagination.currPage]}
                    renderItem={itemRenderer}
                />
            </UserControls.Col>
        </UserControls.Row>
        <LibraryModal
            open={libraryModalOpen}
            onCancel={() => setLibraryModalOpen(false)}
            pubMedId={modalItem?.uid ?? ''}
        />
    </UserControls.Form>
}