import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePubMed } from "../../hooks/usePubMed";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { TouchableRow } from "../userControls/touchableRow";

type PropType = {}

const minTextSearchLength = 3;

export const SearchOnline: React.FunctionComponent<PropType> = ({ }) => {

    const router = useRouter();
    const { fetchArticles } = usePubMed();

    const onClick = () => {

    }

    const itemRenderer = (item: string, index: number) => {
        // return searchResulRenderer[item.type](item as any, { router })
        return <TouchableRow onClick={onClick}>
            <UserControls.Col xs={24}>
                {item}
            </UserControls.Col>
        </TouchableRow>;
    }

    const [searchResult, setSearchResult] = useState<IPubMedSearchResult>()

    const [form] = UserControls.Form.useForm();

    const onFinish = async ({ term }: { term: string }) => {
        const resp = await fetchArticles(term)
        console.info('resp', resp)
        setSearchResult(resp.esearchresult)
    };

    return <UserControls.Form form={form} onFinish={onFinish}>
        <UserControls.Row gutter={20}>
            <UserControls.Col xs={22}>
                <UserControls.Form.Item
                    initialValue={''}
                    name={'term'}
                    label='Search term'
                    rules={[{ min: minTextSearchLength, message: `min text search length: ${minTextSearchLength}` }]} >
                    <UserControls.Input />
                </UserControls.Form.Item>
            </UserControls.Col>
            <UserControls.Col xs={2}>
                <UserControls.Button htmlType="submit" icon={<AntdIcons.SearchOutlined />} />
            </UserControls.Col>
            <UserControls.Col xs={24}>
                <UserControls.List

                    dataSource={searchResult ? searchResult.idlist : []}
                    renderItem={itemRenderer}
                />
            </UserControls.Col>

        </UserControls.Row>
    </UserControls.Form>
}