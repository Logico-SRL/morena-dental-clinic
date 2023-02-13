import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MCureRighe } from "./MCureRighe";
import { TabListiniRighe } from "./TabListiniRighe";
import { TabSpecialita } from "./TabSpecialita";
import { TabPrestazioniFasioperative } from "./TabPrestazioniFasioperative";
import { TabPrestazioniGrafico } from "./TabPrestazioniGrafico";
import { TabPrestazioniNotecliniche } from "./TabPrestazioniNotecliniche";

@Index("IX_AM-PRESTAZIONI", ["idSpecialit", "ordinamento"], {})
@Index("IX2_AM-PRESTAZIONI", ["codice"], {})
@Index("PK_TAB-PRESTAZIONI", ["id"], { unique: true })
@Entity("TAB-PRESTAZIONI", { schema: "dbo" })
export class TabPrestazioni {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDSpecialità", default: () => "(0)" })
  idSpecialit: number;

  @Column("smallint", { name: "Ordinamento", default: () => "(0)" })
  ordinamento: number;

  @Column("nvarchar", { name: "Codice", nullable: true, length: 4 })
  codice: string | null;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 100 })
  descrizione: string | null;

  @Column("smallint", { name: "Durata", nullable: true, default: () => "(0)" })
  durata: number | null;

  @Column("int", { name: "Colore1", nullable: true, default: () => "(0)" })
  colore1: number | null;

  @Column("int", { name: "Colore2", nullable: true, default: () => "(0)" })
  colore2: number | null;

  @Column("bit", { name: "Tipologia", nullable: true, default: () => "(1)" })
  tipologia: boolean | null;

  @Column("nvarchar", { name: "CartellaSpec", nullable: true, length: 1 })
  cartellaSpec: string | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  @Column("bit", {
    name: "UsaInStatoPregresso",
    nullable: true,
    default: () => "(0)",
  })
  usaInStatoPregresso: boolean | null;

  @Column("int", { name: "IDMultiMedia", nullable: true })
  idMultiMedia: number | null;

  // @OneToMany(() => MCureRighe, (mCureRighe) => mCureRighe.idPrestazione)
  // mCureRighes: MCureRighe[];

  // @OneToMany(
  //   () => TabListiniRighe,
  //   (tabListiniRighe) => tabListiniRighe.idPrestazione2
  // )
  // tabListiniRighes: TabListiniRighe[];

  // @ManyToOne(
  //   () => TabSpecialita,
  //   (tabSpecialita) => tabSpecialita.tabPrestazionis
  // )
  // @JoinColumn([{ name: "IDSpecialità", referencedColumnName: "id" }])
  // idSpecialit_2: TabSpecialita;

  // @OneToMany(
  //   () => TabPrestazioniFasioperative,
  //   (tabPrestazioniFasioperative) => tabPrestazioniFasioperative.idPrestazione2
  // )
  // tabPrestazioniFasioperatives: TabPrestazioniFasioperative[];

  // @OneToMany(
  //   () => TabPrestazioniGrafico,
  //   (tabPrestazioniGrafico) => tabPrestazioniGrafico.idPrestazione2
  // )
  // tabPrestazioniGraficos: TabPrestazioniGrafico[];

  // @OneToMany(
  //   () => TabPrestazioniNotecliniche,
  //   (tabPrestazioniNotecliniche) => tabPrestazioniNotecliniche.idPrestazione2
  // )
  // tabPrestazioniNotecliniches: TabPrestazioniNotecliniche[];
}
