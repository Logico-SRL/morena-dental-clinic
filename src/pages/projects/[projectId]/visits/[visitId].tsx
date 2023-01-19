import { useRouter } from "next/router";
import { SplittedPage } from "../../../../components/layout/splittedPage";
import { BackButton } from "../../../../components/userControls/backButton";
import { EditVisit } from "../../../../components/visits/editVisit";
import { useVisit } from "../../../../hooks/useVisit";
import UserControls from "../../../../userControls";
import { AntdIcons } from "../../../../userControls/icons";

const LeftTitle = ({ onList, visit }: { visit: IVisit | undefined, onList: () => void }) => {
    return <>
        <UserControls.Typography.Title level={3}>
            EDIT VISIT {visit?.title || ''}
        </UserControls.Typography.Title>

        <UserControls.Space style={{ marginLeft: 'auto' }}>
            <BackButton />
            <UserControls.Button onClick={onList} size="large" icon={<AntdIcons.UnorderedListOutlined />} />
        </UserControls.Space>

    </>
}

const Comp: PageComponent = () => {


    const { push, query } = useRouter();

    const { projectId, visitId } = query as { projectId: string, visitId: string }
    const { visit, saveVisit } = useVisit(projectId, visitId)

    const onList = () => {
        push(`/projects`)
    }

    const RightTitle = () => {
        return <UserControls.Typography.Title level={4}>
            ONLINE LIBRARY
        </UserControls.Typography.Title>
    }

    return (<><SplittedPage
        LeftTitle={<LeftTitle onList={onList} visit={visit} />}
        RightTitle={<RightTitle />}
        Left={<EditVisit projectId={projectId} visit={visit} />}
    />
    </>)
}

export default Comp;