import { NoteEntity } from "../../repository/entities/note";

export const repoNoteToNote = (r: NoteEntity, skipRel: boolean = true): INote => {
    const { macroProject, ...other } = r;
    // console.info('repoTagToTag', r);
    return {
        ...other,
        // macroProject: skipRel ? undefined : repoMacroProjToMacroProj(macroProject)
    }
}