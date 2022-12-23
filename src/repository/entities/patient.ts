import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: "patients"
})
export class PatientEntity {

    @PrimaryColumn()
    id: string;

    @Column({ nullable: true })
    name?: string

    @Column({ nullable: true })
    externalId?: string

}
