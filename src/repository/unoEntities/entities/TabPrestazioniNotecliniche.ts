import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TabPrestazioni } from "./TabPrestazioni";

@Index("IX_TAB-PRESTAZIONI-NOTECLINICHE", ["idPrestazione", "progressivo"], {})
@Index("PK_TAB-PRESTAZIONI-NOTECLINICHE", ["id"], { unique: true })
@Entity("TAB-PRESTAZIONI-NOTECLINICHE", { schema: "dbo" })
export class TabPrestazioniNotecliniche {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IdPrestazione" })
  idPrestazione: number;

  @Column("smallint", { name: "Progressivo", default: () => "(0)" })
  progressivo: number;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 40 })
  descrizione: string | null;

  // @ManyToOne(
  //   () => TabPrestazioni,
  //   (tabPrestazioni) => tabPrestazioni.tabPrestazioniNotecliniches
  // )
  // @JoinColumn([{ name: "IdPrestazione", referencedColumnName: "id" }])
  // idPrestazione2: TabPrestazioni;
}
