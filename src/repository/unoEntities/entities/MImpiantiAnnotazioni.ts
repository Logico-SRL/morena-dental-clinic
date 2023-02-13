import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MImpiantiSituazione } from "./MImpiantiSituazione";

@Index("IX_M-IMPIANTI-ANNOTAZIONI", ["idSituazione", "idNota"], {})
@Index("M-IMPIANTI-ANNOTAZIONI_PK", ["id"], { unique: true })
@Entity("M-IMPIANTI-ANNOTAZIONI", { schema: "dbo" })
export class MImpiantiAnnotazioni {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDSituazione" })
  idSituazione: number;

  @Column("int", { name: "IDNota" })
  idNota: number;

  @Column("nvarchar", { name: "Valore", nullable: true, length: 2 })
  valore: string | null;

  @Column("datetime", { name: "DataAggiornamento", nullable: true })
  dataAggiornamento: Date | null;

  @Column("datetime", { name: "DataInserimento", nullable: true })
  dataInserimento: Date | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  // @ManyToOne(
  //   () => MImpiantiSituazione,
  //   (mImpiantiSituazione) => mImpiantiSituazione.mImpiantiAnnotazionis,
  //   { onDelete: "CASCADE", onUpdate: "CASCADE" }
  // )
  // @JoinColumn([{ name: "IDSituazione", referencedColumnName: "id" }])
  // idSituazione2: MImpiantiSituazione;
}
