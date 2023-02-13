import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IX_M-STERILIZZAZIONE-TEST", ["dataOra", "idTest", "idAutoclave"], {})
@Index("PK_ST-TEST", ["id"], { unique: true })
@Entity("M-STERILIZZAZIONE-TEST", { schema: "dbo" })
export class MSterilizzazioneTest {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTest" })
  idTest: number;

  @Column("int", { name: "IDAutoclave" })
  idAutoclave: number;

  @Column("int", { name: "IDOperatore" })
  idOperatore: number;

  @Column("bit", { name: "Risultato" })
  risultato: boolean;

  @Column("datetime", { name: "DataOra" })
  dataOra: Date;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;
}
