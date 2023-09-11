import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MSterilizzazioneTray } from "./MSterilizzazioneTray";

@Index(
  "IX_M-STERILIZZAZIONE",
  ["dataEsecuzione", "idAutoclave", "idOperatore"],
  {}
)
@Index("PK_M-STERILIZZAZIONE", ["id"], { unique: true })
@Entity("M-STERILIZZAZIONE", { schema: "dbo" })
export class MSterilizzazione {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Codice" })
  codice: number;

  @Column("int", { name: "IDAutoclave" })
  idAutoclave: number;

  @Column("int", { name: "IDSocietà" })
  idSociet: number;

  @Column("datetime", { name: "DataEsecuzione" })
  dataEsecuzione: Date;

  @Column("datetime", { name: "DataScadenza" })
  dataScadenza: Date;

  @Column("ntext", { name: "NomeFile", nullable: true })
  nomeFile: string | null;

  @Column("int", { name: "IDOperatore", nullable: true })
  idOperatore: number | null;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  @OneToMany(
    () => MSterilizzazioneTray,
    (mSterilizzazioneTray) => mSterilizzazioneTray.idCiclo2
  )
  mSterilizzazioneTrays: MSterilizzazioneTray[];
}
