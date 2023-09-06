import { Column, Entity, Index, ManyToMany, PrimaryColumn } from "typeorm";
import { MacroProjectEntity, ProjectEntity } from ".";

@Entity({
    name: "library"
})

export class LibraryEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    pubMedId: string;

    @Column({ type: 'text' })
    @Index({ fulltext: true })
    title: string

    @Column({ type: 'text', nullable: true })
    @Index({ fulltext: true })
    abstract?: string

    @Column({ type: 'text' })
    @Index({ fulltext: true })
    author: string

    @Column({ type: 'json', nullable: true })
    json?: any

    @ManyToMany(type => ProjectEntity, proj => proj.libraries)
    projects?: MacroProjectEntity[]

    @ManyToMany(type => MacroProjectEntity, macro => macro.libraries)
    macroProjects?: MacroProjectEntity[]

}
