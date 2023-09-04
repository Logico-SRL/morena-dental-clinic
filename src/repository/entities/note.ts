import { Column, Entity, Index, ManyToOne, PrimaryColumn } from "typeorm";
import { MacroProjectEntity } from ".";

@Entity({
    name: "notes"
})

export class NoteEntity {

    @PrimaryColumn()
    id: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    @Column({ type: 'text' })
    @Index({ fulltext: true })
    title: string

    @Column({ type: 'text' })
    @Index({ fulltext: true })
    content: string

    @ManyToOne(type => MacroProjectEntity, macro => macro.notes)
    macroProject?: MacroProjectEntity

}
