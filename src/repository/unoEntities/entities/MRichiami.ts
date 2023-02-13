import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AAnagrafica } from "./AAnagrafica";

@Index("PK_M-RICHIAMI", ["id"], { unique: true })
@Entity("M-RICHIAMI", { schema: "dbo" })
export class MRichiami {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTipo" })
  idTipo: number;

  @Column("int", { name: "IDOperatore", nullable: true })
  idOperatore: number | null;

  @Column("int", { name: "IDImpegno", nullable: true })
  idImpegno: number | null;

  @Column("datetime", { name: "DataRichiamo", nullable: true })
  dataRichiamo: Date | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("bit", { name: "flagRichiamare", nullable: true })
  flagRichiamare: boolean | null;

  @Column("bit", { name: "flagRichiamato", nullable: true })
  flagRichiamato: boolean | null;

  @Column("bit", { name: "flagTel", nullable: true })
  flagTel: boolean | null;

  @Column("bit", { name: "flagEMail", nullable: true })
  flagEMail: boolean | null;

  @Column("bit", { name: "flagLettera", nullable: true })
  flagLettera: boolean | null;

  @Column("bit", { name: "flagSMS", nullable: true })
  flagSms: boolean | null;

  @Column("smallint", { name: "StatoSMS", nullable: true })
  statoSms: number | null;

  @Column("bit", { name: "flagAppuntamento", nullable: true })
  flagAppuntamento: boolean | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  @Column("smallint", { name: "Stato", default: () => "(0)" })
  stato: number;

  @Column("smallint", { name: "StatoCom", default: () => "(0)" })
  statoCom: number;

  @Column("bit", { name: "flagAppuntamentoMancRif", nullable: true })
  flagAppuntamentoMancRif: boolean | null;

  @Column("int", { name: "IDFiglio", nullable: true })
  idFiglio: number | null;

  @Column("int", { name: "OLBReqTimeSlot", nullable: true })
  olbReqTimeSlot: number | null;

  @Column("nvarchar", { name: "OLBReqLnk", nullable: true, length: 200 })
  olbReqLnk: string | null;

  @Column("nvarchar", { name: "OLBReqId", nullable: true, length: 40 })
  olbReqId: string | null;

  // @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.mRichiamis)
  // @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  // idAnagrafica: AAnagrafica;
}
