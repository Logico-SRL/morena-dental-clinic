import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { ProjectEntity, VisitEntity } from ".";

@Entity({
    name: "tag"
})

export class TagEntity {

    @PrimaryColumn()
    tag: string;

    @Column()
    date: Date;

    @ManyToMany(type => ProjectEntity, t => t.tags)
    projects: ProjectEntity[]

    @ManyToMany(type => ProjectEntity, t => t.tags)
    visits: VisitEntity[]

    @ManyToMany(type => ProjectEntity, t => t.tags)
    patients: PatientEntity[]

}
