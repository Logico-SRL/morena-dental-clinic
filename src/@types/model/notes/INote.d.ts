type NoteEntity = import('../../../repository/entities/index').NoteEntity

type INote = Omit<NoteEntity, 'macroProject'> & {
    date: Date | undefined,
    macroProject?: IMacroProject,
}
