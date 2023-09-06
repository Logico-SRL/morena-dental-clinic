import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { useEffect } from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { useAuthSession } from "./useAuthSession";

const librariesStore = atom<ILibrary[]>([]);
const loadingLibrariesStore = atom<boolean>(false)

const initialized = { current: false };

const abortController = {
    current: new AbortController()
}

export const useLibrary = () => {

    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)

    const { isLoggedIn } = useAuthSession();
    const libraries = useStore(librariesStore);
    const loadingLibraries = useStore(loadingLibrariesStore);

    useEffect(() => {


        if (!initialized.current && isLoggedIn) {
            initialized.current = true;
            // console.info('useProjects', initialized.current);

            // initialized = true;
            if (abortController.current) {
                abortController.current.abort();
                abortController.current = new AbortController();
            }
            loadingLibrariesStore.set(true);
            httpService.get<ILibrary[]>(`/api/protected/library`, { signal: abortController.current?.signal })
                .then(d => {
                    librariesStore.set(d.data);
                    return d.data;
                })
                .catch(() => {
                    librariesStore.set([]);
                    return [];
                })
                .finally(() => {
                    loadingLibrariesStore.set(false);
                })

            return () => {
                // console.info('useProjects dismounting');
                // controller.abort();
                // initialized.current = false;
            }
        }

    }, [isLoggedIn])

    const getLibraryFromArticle = (article: IPubMedDetail) => {
        const title = article.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.ArticleTitle._text;
        const author = ([] as any).concat(article.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.AuthorList.Author)
            .map((a: any) => `${a.LastName?._text ?? ''} ${a.ForeName?._text ?? ''}`).join(', ');
        const pubMedId = article.PubmedArticleSet.PubmedArticle.MedlineCitation.PMID._text;
        const abstract = article.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.Abstract?.AbstractText._text;
        const body: ILibrary = {
            id: '',
            title,
            author,
            pubMedId,
            abstract,
            json: article,
        }
        return body;
    }

    const addToLibrary = async (article: IPubMedDetail) => {

        const body = getLibraryFromArticle(article);

        const res = await httpService.post<ILibrary>(`/api/protected/library`, body, { signal: abortController.current?.signal })
        const curr = librariesStore.get();
        curr.push(res.data);
        librariesStore.set([...curr]);

    }

    const addToProj = async (article: IPubMedDetail, proj: IProject) => {

        const body = getLibraryFromArticle(article);
        body.projects = [{ id: proj.id }]

        const res = await httpService.post<ILibrary>(`/api/protected/library`, body, { signal: abortController.current?.signal })
        const curr = librariesStore.get();
        curr.push(res.data);
        librariesStore.set([...curr]);
        return body;

    }

    const addToMacroProj = async (article: IPubMedDetail, macroProj: IMacroProject) => {

        const body = getLibraryFromArticle(article);
        body.macroProjects = [{ id: macroProj.id }]

        const res = await httpService.post<ILibrary>(`/api/protected/library`, body, { signal: abortController.current?.signal })
        const curr = librariesStore.get();
        curr.push(res.data);
        librariesStore.set([...curr]);
        return body

    }

    const removeFromLibrary = async (article: ILibrary) => {

        const res = await httpService.delete<ILibrary>(`/api/protected/library/${article.id}`, { signal: abortController.current?.signal })
        let curr = librariesStore.get();
        curr = curr.filter(l => l.id !== article.id);
        librariesStore.set(curr);

    }


    return { addToLibrary, removeFromLibrary, libraries, loadingLibraries, addToProj, addToMacroProj };
}