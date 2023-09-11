import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { TabPrestazioni } from ".";

@Index(
  "IX_TAB-PRESTAZIONI-PROPRIETA",
  ["idPrestazione", "idDente", "idTipologia"],
  {}
)
@Index("PK_TAB-PRESTAZIONI-PROPRIETA", ["id"], { unique: true })
@Entity("TAB-PRESTAZIONI-GRAFICO", { schema: "dbo" })
export class TabPrestazioniGrafico {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDPrestazione" })
  idPrestazione: number;

  @Column("smallint", { name: "IDDente", nullable: true })
  idDente: number | null;

  @Column("int", { name: "IDTipologia", nullable: true })
  idTipologia: number | null;

  @Column("smallint", { name: "Forma", nullable: true })
  forma: number | null;

  @Column("smallint", { name: "Height", nullable: true })
  height: number | null;

  @Column("smallint", { name: "Width", nullable: true })
  width: number | null;

  @Column("smallint", { name: "X", nullable: true })
  x: number | null;

  @Column("smallint", { name: "Y", nullable: true })
  y: number | null;

  @Column("nvarchar", { name: "Cancella", nullable: true, length: 4 })
  cancella: string | null;

  @Column("nvarchar", { name: "Contorno", nullable: true, length: 4 })
  contorno: string | null;

  @Column("nvarchar", { name: "Speciali", nullable: true, length: 4 })
  speciali: string | null;

  @Column("smallint", { name: "Tratto", nullable: true })
  tratto: number | null;

  @Column("nvarchar", { name: "IDSelezioneVeloce", nullable: true, length: 4 })
  idSelezioneVeloce: string | null;

  @Column("nvarchar", { name: "Img", nullable: true, length: 40 })
  img: string | null;

  @ManyToOne(
    () => TabPrestazioni,
    (tabPrestazioni) => tabPrestazioni.tabPrestazioniGraficos
  )
  @JoinColumn([{ name: "IDPrestazione", referencedColumnName: "id" }])
  idPrestazione2: TabPrestazioni;
}
