import { repoProjToProj } from ".";
import { defaultProject } from "../defaultValues";
import { repoNoteToNote } from "./repoNoteToNote";

export const repoMacroProjToMacroProj = (p: MacroProjectEntity): IMacroProject => {
    const def = defaultProject();
    return {
        ...def,
        ...p,
        category: p.category,
        subCategory: p.subCategory,
        projects: (p.projects || []).map(t => repoProjToProj(t)),
        notes: (p.notes || []).map(t => repoNoteToNote(t)),
    }
}