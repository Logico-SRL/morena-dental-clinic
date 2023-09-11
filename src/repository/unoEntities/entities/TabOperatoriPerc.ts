import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { TabOperatori, TabSpecialita } from ".";

@Index("IX_TAB-OPERATORI-PERC", ["tipo", "idOperatore", "idSpecialit"], {
  unique: true,
})
@Index("PK_TAB-OPERATORI-PERC", ["id"], { unique: true })
@Entity("TAB-OPERATORI-PERC", { schema: "dbo" })
export class TabOperatoriPerc {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Tipo" })
  tipo: number;

  @Column("int", { name: "IDOperatore" })
  idOperatore: number;

  @Column("int", { name: "IDSpecialità" })
  idSpecialit: number;

  @Column("smallmoney", { name: "PercPlus", default: () => "(0)" })
  percPlus: number;

  @Column("smallmoney", { name: "PercMin", default: () => "(0)" })
  percMin: number;

  @ManyToOne(
    () => TabOperatori,
    (tabOperatori) => tabOperatori.tabOperatoriPercs
  )
  @JoinColumn([{ name: "IDOperatore", referencedColumnName: "id" }])
  idOperatore2: TabOperatori;

  @ManyToOne(
    () => TabSpecialita,
    (tabSpecialita) => tabSpecialita.tabOperatoriPercs
  )
  @JoinColumn([{ name: "IDSpecialità", referencedColumnName: "id" }])
  idSpecialit_2: TabSpecialita;
}
