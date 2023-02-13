import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MIgieneTestata } from "./MIgieneTestata";
import { MPerioTestata } from "./MPerioTestata";
import { TabPerioRilevazioni } from "./TabPerioRilevazioni";

@Index("PK_M-PERIO-SEQUENZE", ["id"], { unique: true })
@Entity("TAB-PERIO-SEQUENZE", { schema: "dbo" })
export class TabPerioSequenze {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Descrizione", length: 50 })
  descrizione: string;

  @Column("ntext", { name: "Dettaglio" })
  dettaglio: string;

  @Column("bit", { name: "Is4Posizioni", nullable: true })
  is4Posizioni: boolean | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  @Column("smallint", { name: "Tipo", nullable: true })
  tipo: number | null;

  // @OneToMany(
  //   () => MIgieneTestata,
  //   (mIgieneTestata) => mIgieneTestata.idSequenza
  // )
  // mIgieneTestatas: MIgieneTestata[];

  // @OneToMany(() => MPerioTestata, (mPerioTestata) => mPerioTestata.idSequenza)
  // mPerioTestatas: MPerioTestata[];

  // @OneToMany(
  //   () => TabPerioRilevazioni,
  //   (tabPerioRilevazioni) => tabPerioRilevazioni.idSequenza
  // )
  // tabPerioRilevazionis: TabPerioRilevazioni[];
}
