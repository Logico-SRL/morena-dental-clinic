import { useRouter } from "next/router";
import { useState } from "react";
import { SplittedPage } from "../../components/layout/splittedPage";
import { LibraryInfo } from "../../components/library/libraryInfo";
import { EditMacroProject } from "../../components/macroprojects/editMacroProject";
import { SearchOnlineModal } from "../../components/search/searchOnlineModal";
import { useLibrary } from "../../hooks/useLibrary";
import { useMacroProject } from "../../hooks/useMacroProject";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";


const LeftTitle = ({ onList, onEditClick, inEdit, onPubmedClick }: { onList: () => void, onEditClick: () => void, inEdit: boolean, onPubmedClick: () => void }) => {
    return <>
        <UserControls.Typography.Title level={3}>
            MACRO PROJECT
        </UserControls.Typography.Title>
        <UserControls.Space style={{ marginLeft: 'auto' }}>
            <UserControls.Button size="large" icon={<AntdIcons.EditOutlined />} onClick={onEditClick} >
                {inEdit ? 'Cancel edit' : 'Edit'}
            </UserControls.Button>
            <UserControls.Button size="large" icon={<AntdIcons.TranslationOutlined />} onClick={onPubmedClick} >
                Pubmed
            </UserControls.Button>
            <UserControls.Button onClick={onList} size="large" icon={<AntdIcons.UnorderedListOutlined />} >
                All
            </UserControls.Button>
        </UserControls.Space>
    </>
}

const RightTitle = () => {

    return <UserControls.Typography.Title level={4}>
        MACROPROJECT LIBRARIES
    </UserControls.Typography.Title>
}



const Comp: PageComponent = () => {

    const { push, query } = useRouter();

    const projectId = query.projectId as string;

    const { macroProject, saveMacroProject, loadingMacroProject, reloadMacroProj } = useMacroProject(projectId || '')

    const [inEdit, setInEdit] = useState(false);
    const { addToMacroProj, removeFromMacroProj } = useLibrary()
    const [showPubmedModal, setShowPubmedModal] = useState(false);

    const removeLibFromMacroProj = async (article: ILibrary) => {
        await removeFromMacroProj(article, macroProject);
        await reloadMacroProj();
    }

    const onList = () => {
        push(`/macroprojects`)
    }

    const onEditClick = () => {
        setInEdit(v => !v)
    }

    const onPubmedClick = () => {
        setShowPubmedModal(true)
    }

    const onSaveItem = async (item: IPubMedDetail) => {
        if (macroProject) {
            await addToMacroProj(item, macroProject)
            reloadMacroProj();
            setShowPubmedModal(false);
        }
    }




    return (<>
        <SplittedPage
            LeftTitle={<LeftTitle onList={onList} onEditClick={onEditClick} inEdit={inEdit} onPubmedClick={onPubmedClick} />}
            RightTitle={<RightTitle />}
            Left={<EditMacroProject project={macroProject} loadingProject={loadingMacroProject}
                saveProject={saveMacroProject} inEdit={inEdit} setInEdit={setInEdit} />}
            Right={<LibraryInfo
                libraries={macroProject?.libraries || []}
                remove={removeLibFromMacroProj}
            />}
        />
        <SearchOnlineModal
            open={showPubmedModal}
            onCancel={() => setShowPubmedModal(false)}
            onSaveItem={onSaveItem}
        /></>)
}

export default Comp;