import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { TabSicurezzaGruppi } from ".";

@Index("PK_TAB-SICUREZZA-UTENTI", ["id"], { unique: true })
@Entity("TAB-SICUREZZA-UTENTI", { schema: "dbo" })
export class TabSicurezzaUtenti {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Campo1", nullable: true, length: 50 })
  campo1: string | null;

  @Column("nvarchar", { name: "Campo2", nullable: true, length: 50 })
  campo2: string | null;

  @Column("nvarchar", { name: "Campo3", nullable: true, length: 50 })
  campo3: string | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  @ManyToOne(
    () => TabSicurezzaGruppi,
    (tabSicurezzaGruppi) => tabSicurezzaGruppi.tabSicurezzaUtentis
  )
  @JoinColumn([{ name: "IDGruppo", referencedColumnName: "id" }])
  idGruppo: TabSicurezzaGruppi;
}
