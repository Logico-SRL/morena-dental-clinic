import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AgImpegni } from "./AgImpegni";

@Index("IdPostazione", ["id"], { unique: true })
@Index("IX_TAB-POSTAZIONI", ["descrizione", "codInterno"], { unique: true })
@Index("PK_TAB-POSTAZIONI", ["id"], { unique: true })
@Entity("TAB-POSTAZIONI", { schema: "dbo" })
export class TabPostazioni {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 25 })
  descrizione: string | null;

  @Column("nvarchar", { name: "CodInterno", nullable: true, length: 2 })
  codInterno: string | null;

  @Column("smallint", {
    name: "GruppoUtenti",
    nullable: true,
    default: () => "(0)",
  })
  gruppoUtenti: number | null;

  @Column("int", { name: "Colore", nullable: true, default: () => "(0)" })
  colore: number | null;

  @Column("int", { name: "IdSocietà", nullable: true })
  idSociet: number | null;

  @Column("smallint", { name: "Ordinamento", nullable: true })
  ordinamento: number | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(0)" })
  statoRecord: boolean | null;

  @Column("nvarchar", { name: "FunzioneDefault", nullable: true, length: 30 })
  funzioneDefault: string | null;

  @Column("bit", { name: "NoSCIP", default: () => "(0)" })
  noScip: boolean;

  @Column("bit", { name: "NoAgenda", default: () => "(0)" })
  noAgenda: boolean;

  @OneToMany(() => AgImpegni, (agImpegni) => agImpegni.idPostazione2)
  agImpegnis: AgImpegni[];
}
