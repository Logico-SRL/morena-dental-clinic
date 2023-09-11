import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TabPrestazioni } from "./TabPrestazioni";

@Index("IX_TAB-PRESTAZIONI-FASIOPERATIVE", ["idPrestazione", "progressivo"], {})
@Index("PK_TAB-PRESTAZIONI-FASIOPERATIVE", ["id"], { unique: true })
@Entity("TAB-PRESTAZIONI-FASIOPERATIVE", { schema: "dbo" })
export class TabPrestazioniFasioperative {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", {
    name: "IDPrestazione",
    nullable: true,
    default: () => "(0)",
  })
  idPrestazione: number | null;

  @Column("smallint", {
    name: "Progressivo",
    nullable: true,
    default: () => "(0)",
  })
  progressivo: number | null;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 50 })
  descrizione: string | null;

  @Column("smallint", { name: "Durata", nullable: true, default: () => "(0)" })
  durata: number | null;

  @Column("float", {
    name: "Esecuzione%",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  esecuzione: number | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  @ManyToOne(
    () => TabPrestazioni,
    (tabPrestazioni) => tabPrestazioni.tabPrestazioniFasioperatives
  )
  @JoinColumn([{ name: "IDPrestazione", referencedColumnName: "id" }])
  idPrestazione2: TabPrestazioni;
}
