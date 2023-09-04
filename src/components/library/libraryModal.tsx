import { Spin } from "antd"
import { useEffect, useState } from "react"
import { usePubMed } from "../../hooks/usePubMed"
import UserControls from "../../userControls"

type propType = {
    open: boolean,
    onCancel: () => void,
    pubMedId: string
}
export const LibraryModal = ({ open, onCancel, pubMedId }: propType) => {

    const { fetchArticle, fetchingArticle } = usePubMed();
    const [article, setArticle] = useState<IPubMedDetail | null>(null)

    useEffect(() => {
        setArticle(null)
        if (open && pubMedId) {
            fetchArticle(pubMedId).then(setArticle)
        }
    },
        [pubMedId, open])

    return (<UserControls.Modal
        open={open}
        onCancel={onCancel}
        width={'100vw'}
        bodyStyle={{ minHeight: '50vh' }}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText={'Close'}
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
                            <UserControls.Col xs={24}>
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
                                        .map((a: any) => `${a.LastName._text} ${a.ForeName._text}`).join(', ')}
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
                }

            </UserControls.Col>
        </UserControls.Row>
    </UserControls.Modal>)

}