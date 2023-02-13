import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MDocumentiT } from "./MDocumentiT";

@Index("IX_M-DOCUMENTI-R", ["idTestata", "nrRiga"], {})
@Index("PK_M-DOCUMENTI-R", ["id"], { unique: true })
@Entity("M-DOCUMENTI-R", { schema: "dbo" })
export class MDocumentiR {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTestata", default: () => "(0)" })
  idTestata: number;

  @Column("smallint", { name: "NrRiga", default: () => "(0)" })
  nrRiga: number;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 100 })
  descrizione: string | null;

  @Column("datetime", { name: "DataConsegna", nullable: true })
  dataConsegna: Date | null;

  @Column("datetime", { name: "DataRicezione", nullable: true })
  dataRicezione: Date | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("smallint", { name: "Stato", nullable: true })
  stato: number | null;

  @Column("nvarchar", { name: "Protocollo", nullable: true, length: 30 })
  protocollo: string | null;

  @Column("nvarchar", { name: "FileName", nullable: true, length: 80 })
  fileName: string | null;

  @Column("int", { name: "IDOperatore", nullable: true })
  idOperatore: number | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  @Column("bit", { name: "Conservato", nullable: true })
  conservato: boolean | null;

  @Column("datetime", { name: "DataConservazione", nullable: true })
  dataConservazione: Date | null;

  @Column("bit", { name: "InviatoCS", nullable: true })
  inviatoCs: boolean | null;

  @Column("datetime", { name: "DataInvioCS", nullable: true })
  dataInvioCs: Date | null;

  @Column("bigint", { name: "IDDocumentoCS", nullable: true })
  idDocumentoCs: string | null;

  @Column("bigint", { name: "IDOperazioneCS", nullable: true })
  idOperazioneCs: string | null;

  @Column("nvarchar", { name: "StatusCS", nullable: true, length: 50 })
  statusCs: string | null;

  @Column("datetime", { name: "DataStatusCS", nullable: true })
  dataStatusCs: Date | null;

  // @ManyToOne(() => MDocumentiT, (mDocumentiT) => mDocumentiT.mDocumentiRs)
  // @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  // idTestata2: MDocumentiT;
}
