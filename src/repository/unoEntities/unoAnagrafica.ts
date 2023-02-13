import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: "A-ANAGRAFICA"
})
export class UnoAnagraficaEntity {

    @PrimaryColumn()
    id: number;

    @Column({ nullable: true })
    Cognome?: string

    @Column({ nullable: true })
    Nome?: string

    @Column({ nullable: true })
    CodiceFiscale?: string

}
