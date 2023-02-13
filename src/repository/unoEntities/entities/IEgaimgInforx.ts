import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AAnagrafica } from "./AAnagrafica";

@Index("IX_I-EGAIMG-INFORX", ["idPaziente"], {})
@Index("IX_I-EGAIMG-INFORX_1", ["anno", "progressivo"], { unique: true })
@Index("PK_I-EGAIMG-INFORX", ["id"], { unique: true })
@Entity("I-EGAIMG-INFORX", { schema: "dbo" })
export class IEgaimgInforx {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDPaziente" })
  idPaziente: number;

  @Column("int", { name: "IDEGAIMG", nullable: true })
  idegaimg: number | null;

  @Column("smallint", { name: "Anno", nullable: true })
  anno: number | null;

  @Column("int", { name: "Progressivo", nullable: true })
  progressivo: number | null;

  @Column("datetime", { name: "Data", nullable: true })
  data: Date | null;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 50 })
  descrizione: string | null;

  @Column("nvarchar", { name: "Tempo", nullable: true, length: 50 })
  tempo: string | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("datetime", { name: "DataAggiornamento", nullable: true })
  dataAggiornamento: Date | null;

  @Column("datetime", { name: "DataInserimento", nullable: true })
  dataInserimento: Date | null;

  // @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.iEgaimgInforxes)
  // @JoinColumn([{ name: "IDPaziente", referencedColumnName: "id" }])
  // idPaziente2: AAnagrafica;
}
