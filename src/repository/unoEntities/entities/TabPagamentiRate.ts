import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TabPagamenti } from "./TabPagamenti";

@Index("PK_TAB-PAGAMENTI-RATE", ["id"], { unique: true })
@Entity("TAB-PAGAMENTI-RATE", { schema: "dbo" })
export class TabPagamentiRate {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "numGiorni" })
  numGiorni: number;

  @Column("smallint", { name: "percFattura" })
  percFattura: number;

  // @ManyToOne(
  //   () => TabPagamenti,
  //   (tabPagamenti) => tabPagamenti.tabPagamentiRates
  // )
  // @JoinColumn([{ name: "IDPagamento", referencedColumnName: "id" }])
  // idPagamento: TabPagamenti;
}
