import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { ProjectEntity, TagEntity } from ".";

@Entity({
    name: "patients"
})
export class PatientEntity {

    @PrimaryColumn()
    id: string;

    @Column({ nullable: true })
    @Index({ fulltext: true })
    firstName?: string

    @Column({ nullable: true })
    @Index({ fulltext: true })
    familyName?: string

    @Column({ nullable: true })
    fiscalCode?: string

    @Column({ nullable: true })
    externalId?: string

    @Column({ nullable: true })
    age?: number

    @Column({ nullable: true })
    gender?: string

    @Column({ nullable: true })
    dateOfBirth?: Date

    @Column({ nullable: true })
    emergencyPhone?: string

    @Column({ nullable: true })
    bloodGroup?: string

    @Column({ nullable: true, type: 'text' })
    @Index({ fulltext: true })
    notes?: string

    // @Column()
    @OneToMany(type => ProjectEntity, pro => pro.patient)
    projects: ProjectEntity[]

    @ManyToMany(type => TagEntity, t => t.patients, { cascade: ['insert', 'update'] })
    @JoinTable()
    tags: TagEntity[]

}
