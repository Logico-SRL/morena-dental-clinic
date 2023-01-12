import { Column, Entity, PrimaryColumn } from "typeorm";

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

}
