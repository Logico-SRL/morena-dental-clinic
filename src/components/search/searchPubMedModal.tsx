import { Divider, Spin } from "antd"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { usePubMed } from "../../hooks/usePubMed"
import UserControls from "../../userControls"
import { SectionHeader } from "../userControls/sectionHeader"
import { TouchableRow } from "../userControls/touchableRow"

type propType = {
    open: boolean,
    onCancel: () => void,
    pubMedId?: string,
    libraryItem?: ILibrary,
    onSaveItem?: (item: IPubMedDetail) => void
}

export const SearchPubMedModal = ({ open, onCancel, pubMedId, onSaveItem, libraryItem }: propType) => {

    const { fetchArticle, fetchingArticle } = usePubMed();
    const [article, setArticle] = useState<IPubMedDetail | null>(null)
    const showSaveButton = !!onSaveItem && !!article
    const { push } = useRouter();

    useEffect(() => {
        setArticle(null)
        if (open) {
            if (pubMedId) {
                fetchArticle(pubMedId).then(setArticle)
            } else if (libraryItem) {
                setArticle(libraryItem.json)
            }
        }
    },
        [pubMedId, open, libraryItem])

    const artId = article?.PubmedArticleSet.PubmedArticle.MedlineCitation.PMID._text ?? ''

    const isFromLibrary = !!libraryItem

    return (<UserControls.Modal
        open={open}
        onCancel={onCancel}
        width={'100vw'}
        bodyStyle={{ minHeight: '60vh' }}
        okButtonProps={{ style: { display: showSaveButton ? 'inline-block' : 'none' } }}
        cancelText={'Close'}
        okText={'Link'}
        onOk={() => article && onSaveItem && onSaveItem(article)}
    >
        <UserControls.Row>
            <UserControls.Col xs={24} style={{ textAlign: 'center', marginTop: 50 }}>
                {fetchingArticle ?
                    <Spin /> :
                    !article ?
                        <UserControls.Typography>
                            Article Not Found
                        </UserControls.Typography>
                        :
                        <UserControls.Row style={{ textAlign: 'left' }}>
                            <UserControls.Col xs={isFromLibrary ? 14 : 24}>

                                <UserControls.Row style={{ textAlign: 'left' }}>
                                    <UserControls.Col xs={12}>
                                        <UserControls.Typography.Title level={5}>
                                            PubMed Id
                                        </UserControls.Typography.Title>
                                        <UserControls.Typography>
                                            {artId}
                                        </UserControls.Typography>
                                    </UserControls.Col>

                                    <UserControls.Col xs={12}>
                                        <UserControls.Typography.Title level={5}>
                                            Pubmed uri
                                        </UserControls.Typography.Title>
                                        <a href={`https://pubmed.ncbi.nlm.nih.gov/${artId}/`} target={'_blank'}>
                                            {`https://pubmed.ncbi.nlm.nih.gov/${artId}/`}
                                        </a>
                                    </UserControls.Col>


                                    <UserControls.Col xs={24}>

                                    </UserControls.Col>

                                    <UserControls.Col xs={24} style={{ marginTop: 30 }}>
                                        <UserControls.Typography.Title level={4}>
                                            Title
                                        </UserControls.Typography.Title>
                                    </UserControls.Col>

                                    <UserControls.Col xs={24}>
                                        <UserControls.Typography>
                                            {article.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.ArticleTitle._text}
                                        </UserControls.Typography>
                                    </UserControls.Col>

                                    <UserControls.Col xs={24} style={{ marginTop: 30 }}>
                                        <UserControls.Typography.Title level={4}>
                                            Authors
                                        </UserControls.Typography.Title>
                                    </UserControls.Col>

                                    <UserControls.Col xs={24}>
                                        <UserControls.Typography>
                                            {([] as any).concat(article.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.AuthorList.Author)
                                                .map((a: any) => `${a.LastName?._text ?? ''} ${a.ForeName?._text ?? ''}`).join(', ')}
                                        </UserControls.Typography>
                                    </UserControls.Col>

                                    <UserControls.Col xs={24} style={{ marginTop: 30 }}>
                                        <UserControls.Typography.Title level={4}>
                                            Abstract
                                        </UserControls.Typography.Title>
                                    </UserControls.Col>

                                    <UserControls.Col xs={24}>
                                        <UserControls.Typography>
                                            {article.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.Abstract?.AbstractText._text}
                                        </UserControls.Typography>
                                    </UserControls.Col>
                                </UserControls.Row>
                            </UserControls.Col>
                            <UserControls.Col xs={isFromLibrary ? 10 : 0}>
                                <SectionHeader title="Projects" links={[]} />

                                {libraryItem && (libraryItem?.projects ?? [])?.map(proj => (
                                    <TouchableRow onClick={() => push(`/projects/${proj.id}`)}>
                                        <UserControls.Col xs={24}>
                                            <UserControls.Typography>
                                                {proj.id} - {proj.title}
                                            </UserControls.Typography>
                                        </UserControls.Col>
                                    </TouchableRow>
                                ))}

                                <Divider />
                                <SectionHeader title="MacroProjects" links={[]} />

                                {libraryItem && (libraryItem?.macroProjects ?? [])?.map(macroProj => (
                                    <TouchableRow onClick={() => push(`/macroprojects/${macroProj.id}`)}>
                                        <UserControls.Col xs={24}>
                                            <UserControls.Typography>
                                                {macroProj.id} - {macroProj.title}
                                            </UserControls.Typography>
                                        </UserControls.Col>
                                    </TouchableRow>
                                ))}
                                <Divider />
                            </UserControls.Col>
                        </UserControls.Row>
                }

            </UserControls.Col>
        </UserControls.Row>
    </UserControls.Modal>)

}