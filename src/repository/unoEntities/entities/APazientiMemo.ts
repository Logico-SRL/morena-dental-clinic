import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { APazienti } from "./APazienti";
import { TabMemo } from "./TabMemo";

@Index("IX_A-PAZIENTI-MEMO", ["idAnagrafica", "idMemo"], {})
@Index("PK_A-PAZIENTI-MEMO", ["id"], { unique: true })
@Entity("A-PAZIENTI-MEMO", { schema: "dbo" })
export class APazientiMemo {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica", default: () => "(0)" })
  idAnagrafica: number;

  @Column("int", { name: "IDMemo", default: () => "(0)" })
  idMemo: number;

  @Column("datetime", { name: "DataComunicazione", nullable: true })
  dataComunicazione: Date | null;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  // @ManyToOne(() => APazienti, (aPazienti) => aPazienti.aPazientiMemos)
  // @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  // idAnagrafica2: APazienti;

  // @ManyToOne(() => TabMemo, (tabMemo) => tabMemo.aPazientiMemos)
  // @JoinColumn([{ name: "IDMemo", referencedColumnName: "id" }])
  // idMemo2: TabMemo;
}
