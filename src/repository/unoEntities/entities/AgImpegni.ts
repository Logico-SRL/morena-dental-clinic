import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AAnagrafica } from "./AAnagrafica";
import { TabOperatori } from "./TabOperatori";
import { TabPostazioni } from "./TabPostazioni";
import { AgRicorrenze } from "./AgRicorrenze";

@Index("IX_AG-IMPEGNI", ["idAnagrafica", "dataOra"], {})
@Index("IX_AG-IMPEGNI_1", ["idOperatore", "dataOra"], {})
@Index("IX_AG-IMPEGNI_2", ["idPostazione", "dataOra"], {})
@Index("IX_AG-IMPEGNI_OLBId", ["olbId"], {})
@Index("PK_AG-IMPEGNI", ["id"], { unique: true })
@Entity("AG-IMPEGNI", { schema: "dbo" })
export class AgImpegni {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "TipoImpegno", default: () => "(0)" })
  tipoImpegno: number;

  @Column("datetime", { name: "DataOra", default: () => "(0)" })
  dataOra: Date;

  @Column("nvarchar", { name: "DeImpegno", nullable: true, length: 255 })
  deImpegno: string | null;

  @Column("int", { name: "IdAnagrafica", nullable: true })
  idAnagrafica: number | null;

  @Column("smallint", { name: "Durata", nullable: true, default: () => "(0)" })
  durata: number | null;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  @Column("smallint", { name: "Status", nullable: true, default: () => "(0)" })
  status: number | null;

  @Column("smallint", { name: "Categoria", nullable: true })
  categoria: number | null;

  @Column("int", { name: "Colore", nullable: true })
  colore: number | null;

  @Column("int", { name: "IDOperatore", nullable: true, default: () => "(0)" })
  idOperatore: number | null;

  @Column("int", { name: "IdOperatore2", nullable: true })
  idOperatore2: number | null;

  @Column("int", { name: "IdPostazione", nullable: true, default: () => "(0)" })
  idPostazione: number | null;

  @Column("bit", { name: "Allarm", nullable: true, default: () => "(0)" })
  allarm: boolean | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  @Column("datetime", { name: "TimeStamp", nullable: true })
  timeStamp: Date | null;

  @Column("nvarchar", { name: "CloudID", nullable: true, length: 50 })
  cloudId: string | null;

  @Column("nchar", { name: "OraAR", nullable: true, length: 5 })
  oraAr: string | null;

  @Column("nchar", { name: "OraIN", nullable: true, length: 5 })
  oraIn: string | null;

  @Column("nchar", { name: "OraOUT", nullable: true, length: 5 })
  oraOut: string | null;

  @Column("nvarchar", {
    name: "LinkedObjInfo",
    nullable: true,
    length: 12,
    default: () => "NULL",
  })
  linkedObjInfo: string | null;

  @Column("smallint", {
    name: "RifiutatoStatoRipristino",
    default: () => "(0)",
  })
  rifiutatoStatoRipristino: number;

  @Column("datetime", { name: "RifiutatoInData", nullable: true })
  rifiutatoInData: Date | null;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;

  @Column("smallint", { name: "OLBStato", default: () => "(0)" })
  olbStato: number;

  @Column("nvarchar", { name: "OLBId", nullable: true, length: 105 })
  olbId: string | null;

  @Column("bit", { name: "VideoConf", default: () => "(0)" })
  videoConf: boolean;

  // @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.agImpegnis)
  // @JoinColumn([{ name: "IdAnagrafica", referencedColumnName: "id" }])
  // idAnagrafica2: AAnagrafica;

  // @ManyToOne(() => TabOperatori, (tabOperatori) => tabOperatori.agImpegnis)
  // @JoinColumn([{ name: "IDOperatore", referencedColumnName: "id" }])
  // idOperatore3: TabOperatori;

  // @ManyToOne(() => TabPostazioni, (tabPostazioni) => tabPostazioni.agImpegnis)
  // @JoinColumn([{ name: "IdPostazione", referencedColumnName: "id" }])
  // idPostazione2: TabPostazioni;

  // @OneToMany(() => AgRicorrenze, (agRicorrenze) => agRicorrenze.idImpegno)
  // agRicorrenzes: AgRicorrenze[];
}
