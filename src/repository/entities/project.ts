import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { CategoryEntity, PatientEntity } from ".";
import { ProjectCategoryEntity } from "./categories";


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
    category: CategoryEntity

    // @Column()
    @ManyToOne(type => ProjectCategoryEntity)
    // @ManyToMany(type => ProjectCategoryEntity)
    subCategory: CategoryEntity

    @Column({ type: 'text' })
    medicalHistory: string

    @Column({ type: 'text' })
    notes: string

    @ManyToOne(type => PatientEntity, pat => pat.projects)
    patient: PatientEntity
}
