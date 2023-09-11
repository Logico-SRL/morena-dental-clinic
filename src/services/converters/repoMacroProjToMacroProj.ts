import { repoProjToProj } from ".";
import { defaultMacroProject } from "../defaultValues/defaultMacroProject";
import { repoLibraryToLibrary } from "./repoLibraryToLibrary";
import { repoNoteToNote } from "./repoNoteToNote";

export const repoMacroProjToMacroProj = (p: MacroProjectEntity): IMacroProject => {
    const def = defaultMacroProject();
    return {
        ...def,
        ...p,
        category: p.category,
        subCategory: p.subCategory,
        projects: (p.projects || []).map(t => repoProjToProj(t)),
        notes: (p.notes || []).map(t => repoNoteToNote(t)),
        libraries: (p.libraries || []).map(l => repoLibraryToLibrary(l)),
    }
}