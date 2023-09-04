import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { ProjectCategoryEntity, ProjectEntity } from ".";
import { NoteEntity } from "./note";

@Entity({
    name: "macroprojects"
})
export class MacroProjectEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    @Index({ fulltext: true })
    title: string

    @ManyToOne(type => ProjectCategoryEntity)
    category: ProjectCategoryEntity

    @ManyToOne(type => ProjectCategoryEntity)
    subCategory: ProjectCategoryEntity

    @OneToMany(type => NoteEntity, v => v.macroProject)
    notes?: NoteEntity[]

    @Column({ type: 'datetime', nullable: true })
    createdOn: Date

    @OneToMany(type => ProjectEntity, v => v.macroProject)
    projects?: ProjectEntity[]
}
