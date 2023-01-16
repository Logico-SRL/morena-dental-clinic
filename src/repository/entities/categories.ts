import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({
    name: "projectCategories"
})
export class ProjectCategoryEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string

    @ManyToOne((type) => ProjectCategoryEntity, (category) => category.childrenCategories)
    parentCategory: ProjectCategoryEntity

    @OneToMany((type) => ProjectCategoryEntity, (category) => category.parentCategory)
    childrenCategories: ProjectCategoryEntity[]

}
