import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TabPagamentiRate } from "./TabPagamentiRate";

@Index("IX_TAB-CONDIZIONIPAGAMENTO", ["descrizione"], {})
@Index("PK_TAB-CONDIZIONIPAGAMENTO", ["id"], { unique: true })
@Entity("TAB-PAGAMENTI", { schema: "dbo" })
export class TabPagamenti {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Cod", length: 2 })
  cod: string;

  @Column("nvarchar", { name: "Descrizione", length: 100 })
  descrizione: string;

  @Column("smallint", { name: "numRate", nullable: true, default: () => "(1)" })
  numRate: number | null;

  @Column("bit", {
    name: "IvaSuPrimaRata",
    nullable: true,
    default: () => "(0)",
  })
  ivaSuPrimaRata: boolean | null;

  @Column("nvarchar", {
    name: "Tipo",
    nullable: true,
    length: 1,
    default: () => "N'C'",
  })
  tipo: string | null;

  @Column("bit", { name: "StatoRecord" })
  statoRecord: boolean;

  @OneToMany(
    () => TabPagamentiRate,
    (tabPagamentiRate) => tabPagamentiRate.idPagamento
  )
  tabPagamentiRates: TabPagamentiRate[];
}
