import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { MacroProjectEntity, PatientEntity, ProjectCategoryEntity, TagEntity, VisitEntity } from ".";

@Entity({
    name: "projects"
})
export class ProjectEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    @Index({ fulltext: true })
    title: string

    // @Column()
    @ManyToOne(type => ProjectCategoryEntity)
    // @ManyToMany(type => ProjectCategoryEntity)
    category: ProjectCategoryEntity

    // @Column()
    @ManyToOne(type => ProjectCategoryEntity)
    // @ManyToMany(type => ProjectCategoryEntity)
    subCategory: ProjectCategoryEntity

    @Column({ type: 'text' })
    @Index({ fulltext: true })
    medicalHistory: string

    @Column({ type: 'text' })
    @Index({ fulltext: true })
    notes: string

    @ManyToOne(type => PatientEntity, pat => pat.projects)
    patient: PatientEntity

    @Column({ type: 'datetime', nullable: true })
    createdOn: Date

    @OneToMany(type => VisitEntity, v => v.project)
    visits?: VisitEntity[]

    @ManyToMany(type => TagEntity, t => t.projects, { cascade: ['insert'] })
    @JoinTable()
    tags: TagEntity[]

    @ManyToOne(type => MacroProjectEntity, macro => macro.projects)
    macroProject?: MacroProjectEntity
}
