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

        const libs = librariesStore.get();
        let lib = libs.find(lib => lib.pubMedId === article.PubmedArticleSet.PubmedArticle.MedlineCitation.PMID._text);
        const found = !!lib;

        if (!lib)
            lib = getLibraryFromArticle(article);

        lib.projects = (lib.projects ?? []).concat({ id: proj.id } as any)

        const res = await httpService.post<ILibrary>(`/api/protected/library`, lib, { signal: abortController.current?.signal })
        const curr = librariesStore.get();

        if (!found)
            curr.push(res.data);

        librariesStore.set([...curr]);
        return lib;

    }

    const addToMacroProj = async (article: IPubMedDetail, macroProj: IMacroProject) => {

        const libs = librariesStore.get();
        let lib = libs.find(lib => lib.pubMedId === article.PubmedArticleSet.PubmedArticle.MedlineCitation.PMID._text);
        const found = !!lib;

        if (!lib) {
            lib = getLibraryFromArticle(article);
        }

        lib.macroProjects = (lib.macroProjects || []).concat({ id: macroProj.id } as any);

        const res = await httpService.post<ILibrary>(`/api/protected/library`, lib, { signal: abortController.current?.signal })
        const curr = librariesStore.get();

        if (!found)
            curr.push(res.data);
        librariesStore.set([...curr]);
        return lib

    }

    const removeFromMacroProj = async (article: ILibrary, macroProj: IMacroProject) => {

        macroProj.libraries = (macroProj.libraries || [])?.filter(l => l.id != article.id);
        const res = await httpService.put<ILibrary>(`/api/protected/macroprojects/${macroProj.id}`, macroProj, { signal: abortController.current?.signal })

        const libs = librariesStore.get();
        const found = libs.find(lib => lib.pubMedId === article.pubMedId);

        if (found) {

            found.macroProjects = (found.macroProjects ?? []).filter(m => m.id != macroProj.id)
            librariesStore.set([...libs]);
        }
    }

    const removeFromProj = async (article: ILibrary, proj: IProject) => {

        proj.libraries = (proj.libraries || [])?.filter(l => l.id != article.id);
        const res = await httpService.put<ILibrary>(`/api/protected/projects/${proj.id}`, proj, { signal: abortController.current?.signal })

        const libs = librariesStore.get();
        const found = libs.find(lib => lib.pubMedId === article.pubMedId);

        if (found) {

            found.projects = (found.projects ?? []).filter(m => m.id != proj.id)
            librariesStore.set([...libs]);
        }
    }

    const removeFromLibrary = async (article: ILibrary) => {

        const res = await httpService.delete<ILibrary>(`/api/protected/library/${article.id}`, { signal: abortController.current?.signal })
        let curr = librariesStore.get();
        curr = curr.filter(l => l.id !== article.id);
        librariesStore.set(curr);

    }


    return { addToLibrary, removeFromLibrary, libraries, loadingLibraries, addToProj, addToMacroProj, removeFromMacroProj, removeFromProj };
}