import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { MacroProjectEntity, PatientEntity, ProjectEntity, VisitEntity } from ".";

@Entity({
    name: "tags"
})

export class TagEntity {

    @PrimaryColumn()
    tag: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    @ManyToMany(type => ProjectEntity, t => t.tags)
    projects: ProjectEntity[]

    @ManyToMany(type => MacroProjectEntity, t => t.tags)
    macroProjects: MacroProjectEntity[]

    @ManyToMany(type => VisitEntity, t => t.tags)
    visits: VisitEntity[]

    @ManyToMany(type => PatientEntity, t => t.tags)
    patients: PatientEntity[]

}
