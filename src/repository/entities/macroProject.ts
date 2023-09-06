import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { LibraryEntity, NoteEntity, ProjectCategoryEntity, ProjectEntity, TagEntity } from ".";

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

    @OneToMany(type => NoteEntity, v => v.macroProject, { cascade: true })
    notes?: NoteEntity[]

    @Column({ type: 'datetime', nullable: true })
    createdOn: Date

    @OneToMany(type => ProjectEntity, v => v.macroProject)
    projects?: ProjectEntity[]

    @ManyToMany(type => TagEntity, t => t.projects, { cascade: ['insert', 'update'] })
    @JoinTable()
    tags: TagEntity[]

    @ManyToMany(type => LibraryEntity, v => v.macroProjects, { cascade: ['insert', 'update'] })
    @JoinTable()
    libraries?: LibraryEntity[]

}
