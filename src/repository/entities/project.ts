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

    @Column()
    @ManyToOne(type => ProjectCategoryEntity, cat => cat.id)
    category: CategoryEntity

    @Column()
    @ManyToOne(type => ProjectCategoryEntity, cat => cat.id)
    subCategory: CategoryEntity

    @Column({ type: 'nvarchar', length: 65535 })
    medicalHistory: string

    @Column({ type: 'nvarchar', length: 65535 })
    notes: string

    @ManyToOne(type => PatientEntity, pat => pat.id)
    patient: PatientEntity
}
