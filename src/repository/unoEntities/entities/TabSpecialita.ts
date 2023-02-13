import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TabOperatoriPerc } from "./TabOperatoriPerc";
import { TabPrestazioni } from "./TabPrestazioni";

@Index("PK_TAB-SPECIALITA", ["id"], { unique: true })
@Entity("TAB-SPECIALITA", { schema: "dbo" })
export class TabSpecialita {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Descrizione", length: 25 })
  descrizione: string;

  @Column("smallint", { name: "Ordinamento", nullable: true })
  ordinamento: number | null;

  @Column("int", { name: "IDOperatore", nullable: true })
  idOperatore: number | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  @Column("smallint", { name: "IDstandard", nullable: true })
  iDstandard: number | null;

  // @OneToMany(
  //   () => TabOperatoriPerc,
  //   (tabOperatoriPerc) => tabOperatoriPerc.idSpecialit_2
  // )
  // tabOperatoriPercs: TabOperatoriPerc[];

  // @OneToMany(
  //   () => TabPrestazioni,
  //   (tabPrestazioni) => tabPrestazioni.idSpecialit_2
  // )
  // tabPrestazionis: TabPrestazioni[];
}
