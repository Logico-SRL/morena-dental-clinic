import {
  Column,
  Entity,
  Index, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { TabSicurezzaUtenti } from ".";

@Index("PK_TAB-SICUREZZA-GRUPPI", ["id"], { unique: true })
@Entity("TAB-SICUREZZA-GRUPPI", { schema: "dbo" })
export class TabSicurezzaGruppi {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nchar", { name: "Campo1", nullable: true, length: 50 })
  campo1: string | null;

  @Column("ntext", { name: "Campo2", nullable: true })
  campo2: string | null;

  @Column("ntext", { name: "Campo3", nullable: true })
  campo3: string | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  // @ManyToOne(() => TabSocieta, (tabSocieta) => tabSocieta.tabSicurezzaGruppis)
  // @JoinColumn([{ name: "IDSocietà", referencedColumnName: "id" }])
  // idSociet: TabSocieta;

  @OneToMany(
    () => TabSicurezzaUtenti,
    (tabSicurezzaUtenti) => tabSicurezzaUtenti.idGruppo
  )
  tabSicurezzaUtentis: TabSicurezzaUtenti[];
}
