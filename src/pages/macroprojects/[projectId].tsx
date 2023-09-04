import { useRouter } from "next/router";
import { useState } from "react";
import { SplittedPage } from "../../components/layout/splittedPage";
import { EditMacroProject } from "../../components/macroprojects/editMacroProject";
import { useMacroProject } from "../../hooks/useMacroProject";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";


const LeftTitle = ({ onList, onEditClick, inEdit }: { onList: () => void, onEditClick: () => void, inEdit: boolean }) => {
    return <>
        <UserControls.Typography.Title level={3}>
            MACRO PROJECT
        </UserControls.Typography.Title>
        <UserControls.Space style={{ marginLeft: 'auto' }}>
            <UserControls.Button size="large" icon={<AntdIcons.EditOutlined />} onClick={onEditClick} >
                {inEdit ? 'Cancel edit' : 'Edit'}
            </UserControls.Button>
            <UserControls.Button onClick={onList} size="large" icon={<AntdIcons.UnorderedListOutlined />} >
                All
            </UserControls.Button>
        </UserControls.Space>
    </>
}

const RightTitle = () => {
    return null;

    // return <UserControls.Typography.Title level={4}>
    //     SCREENING
    // </UserControls.Typography.Title>
}



const Comp: PageComponent = () => {

    const { push, query } = useRouter();

    const projectId = query.projectId as string;

    const { macroProject, saveMacroProject, loadingMacroProject } = useMacroProject(projectId || '')

    const [inEdit, setInEdit] = useState(false);

    const onList = () => {
        push(`/macroprojects`)
    }

    const onEditClick = () => {
        setInEdit(v => !v)
    }

    return (<SplittedPage
        LeftTitle={<LeftTitle onList={onList} onEditClick={onEditClick} inEdit={inEdit} />}
        RightTitle={<RightTitle />}
        Left={<EditMacroProject project={macroProject} loadingProject={loadingMacroProject}
            saveProject={saveMacroProject} inEdit={inEdit} setInEdit={setInEdit} />}
    // Right={<VisitMedia projectId={projectId} />}
    />)
}

export default Comp;