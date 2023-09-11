import { useEffect, useState } from "react";
import { usePubMed } from "../../hooks/usePubMed";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { TouchableRow } from "../userControls/touchableRow";
import { SearchPubMedModal } from "./searchPubMedModal";

type PropType = {
    onSaveItem?: (item: IPubMedDetail) => void
}

const minTextSearchLength = 3;
const paginationPageSize = 10;
const fetchTake = 50;

export const SearchOnline: React.FunctionComponent<PropType> = ({ onSaveItem }) => {

    const [pageSize, setPageSize] = useState(paginationPageSize)
    const { fetchArticles, fetchingArticles } = usePubMed();
    const [libraryModalOpen, setLibraryModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState<IPubMedSummary>();

    const onClick = (item: IPubMedSummary) => {
        setModalItem(item)
        setLibraryModalOpen(true)
    }

    const itemRenderer = (item: IPubMedSummary, index: number) => {

        return <TouchableRow onClick={() => onClick(item)}>
            <UserControls.Col xs={4}>
                {item.uid}
            </UserControls.Col>
            <UserControls.Col xs={20}>
                {item.title}
            </UserControls.Col>
        </TouchableRow>;
    }

    type PaginationType = {
        [page: number]: IPubMedSummary[]
    }

    const [pagination, setPagination] = useState<PaginationType>({})

    const [totalCount, setTotalCount] = useState(0)
    const [currPage, setCurrPage] = useState(1)

    const resetPagination = (newSize: number, pageNum: number, pagination: PaginationType) => {

        // const retItems = data.summary.uids.map(uid => data.summary[uid])
        let items: any[] = []
        const paginat: PaginationType = {}
        for (const pag in pagination) {
            items = items.concat(pagination[pag])
        }
        let it = items.splice(0, Math.min(newSize, items.length))

        while (it.length > 0) {
            paginat[pageNum] = it;
            it = items.splice(0, Math.min(newSize, items.length))
            pageNum++;
        }

        setPagination(paginat);
    }


    useEffect(() => {

    }, [currPage])

    const [form] = UserControls.Form.useForm();

    const onFinish = async ({ term }: { term: string }) => {
        setTotalCount(0)
        const resp = await fetchArticles(term, fetchTake)
        setTotalCount(+resp.search.count)
        setItems(currPage, pageSize, resp);
    };

    const searchTerm = () => form.getFieldValue('term');

    const fetchNewItems = async (page: number, pageSize: number) => {
        if (!pagination[page]) {

            const restartingFrom = (page - 1) * pageSize;
            const data = await fetchArticles(searchTerm(), fetchTake, restartingFrom);
            setItems(page, pageSize, data);
        }
    }

    const setItems = async (page: number, pageSize: number, data: IPubMedResponse) => {
        const retItems = data.summary.uids.map(uid => data.summary[uid])

        if (retItems.length == 0) {
            const pag: PaginationType = { 0: [] }
            setCurrPage(0)
            setPagination(pag);
        } else {

            const pag: PaginationType = { ...pagination }
            let pageNum = page;

            let it = retItems.splice(0, Math.min(pageSize, retItems.length))

            while (it.length > 0) {
                pag[pageNum] = it;
                it = retItems.splice(0, Math.min(pageSize, retItems.length))
                pageNum++;
            }

            setPagination(pag);
        }
    }

    const onPageChange = async (page: number, pageSize: number) => {
        setCurrPage(page)
        fetchNewItems(page, pageSize)
    }

    const onPaginationChange = (curr: number, size: number) => {
        setPageSize(size)
        resetPagination(size, currPage, pagination)
    }

    const onItemLink = async (item: IPubMedDetail) => {
        onSaveItem && await onSaveItem(item);
        setLibraryModalOpen(false)
    }

    return <UserControls.Form form={form} onFinish={onFinish}>
        <UserControls.Row>
            <UserControls.Col xs={22}>
                <UserControls.Form.Item
                    initialValue={''}
                    name={'term'}
                    label='Search term'
                    rules={[{ min: minTextSearchLength, message: `min text search length: ${minTextSearchLength}` }]} >
                    <UserControls.Input allowClear />
                </UserControls.Form.Item>
            </UserControls.Col>
            <UserControls.Col xs={2} style={{ textAlign: 'center' }}>
                <UserControls.Button htmlType="submit" icon={<AntdIcons.SearchOutlined />} />
            </UserControls.Col>
            <UserControls.Col xs={24}>
                <UserControls.List
                    loading={fetchingArticles}
                    pagination={{
                        total: totalCount,
                        pageSize: pageSize,
                        onChange: onPageChange,
                        current: currPage,
                        onShowSizeChange: onPaginationChange
                    }}
                    dataSource={pagination[currPage]}
                    renderItem={itemRenderer}
                />
            </UserControls.Col>
        </UserControls.Row>
        <SearchPubMedModal
            term={searchTerm()}
            open={libraryModalOpen}
            onCancel={() => setLibraryModalOpen(false)}
            pubMedId={modalItem?.uid ?? ''}
            onSaveItem={onSaveItem ? onItemLink : undefined}
        />
    </UserControls.Form>
}