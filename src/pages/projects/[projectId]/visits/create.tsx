import { useRouter } from "next/router";
import { SplittedPage } from "../../../../components/layout/splittedPage";
import { BackButton } from "../../../../components/userControls/backButton";
import { NewVisit } from "../../../../components/visits/newVisit";
import { useProject } from "../../../../hooks/useProject";
import UserControls from "../../../../userControls";
import { AntdIcons } from "../../../../userControls/icons";

const LeftTitle = ({ onList, projectId }: { projectId: string, onList: () => void }) => {

    const { project } = useProject(projectId)

    return <>
        <UserControls.Typography.Title level={3}>
            NEW VISIT FOR PROJECT {project?.title || ''}
        </UserControls.Typography.Title>

        <UserControls.Space style={{ marginLeft: 'auto' }}>
            <BackButton />
            <UserControls.Button onClick={onList} size="large" icon={<AntdIcons.UnorderedListOutlined />} />
        </UserControls.Space>

    </>
}

const RightTitle = () => {
    return <UserControls.Typography.Title level={4}>
        ONLINE LIBRARY
    </UserControls.Typography.Title>
}

const Comp: PageComponent = () => {


    const { push, query } = useRouter();
    const { projectId } = query as { projectId: string }

    const onList = () => {
        push(`/projects`)
    }

    return (<><SplittedPage
        LeftTitle={<LeftTitle onList={onList} projectId={projectId} />}
        RightTitle={<RightTitle />}
        Left={<NewVisit projectId={projectId} />}
    />
    </>)
}

export default Comp;