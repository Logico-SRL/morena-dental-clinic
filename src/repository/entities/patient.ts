import { Column, Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { ProjectEntity } from ".";

@Entity({
    name: "patients"
})
export class PatientEntity {

    @PrimaryColumn()
    id: string;

    @Column({ nullable: true })
    firstName?: string

    @Column({ nullable: true })
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

    @Column({ nullable: true, type: 'nvarchar', length: 65535 })
    notes?: string

    // @Column()
    @OneToMany(type => ProjectEntity, pro => pro.id)
    projects: Relation<ProjectEntity>[]

}
