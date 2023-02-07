import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { PatientEntity, ProjectCategoryEntity, TagEntity, VisitEntity } from ".";

@Entity({
    name: "projects"
})
export class ProjectEntity {

    @PrimaryColumn()
    id: string;

    @Column()
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
    medicalHistory: string

    @Column({ type: 'text' })
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
}
