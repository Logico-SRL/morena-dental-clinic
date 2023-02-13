import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AAnagrafica } from "./AAnagrafica";
import { TabDenti } from "./TabDenti";

@Index("IX_M-SITUAZIONE-DENTE", ["idAnagrafica", "idDente"], {})
@Index("PK_M-SITUAZIONE-DENTE", ["id"], { unique: true })
@Entity("M-SITUAZIONE-DENTE", { schema: "dbo" })
export class MSituazioneDente {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica", default: () => "(0)" })
  idAnagrafica: number;

  @Column("smallint", { name: "IDDente", default: () => "(0)" })
  idDente: number;

  @Column("nvarchar", { name: "Situazione", nullable: true, length: 10 })
  situazione: string | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  // @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.mSituazioneDentes)
  // @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  // idAnagrafica2: AAnagrafica;

  // @ManyToOne(() => TabDenti, (tabDenti) => tabDenti.mSituazioneDentes)
  // @JoinColumn([{ name: "IDDente", referencedColumnName: "id" }])
  // idDente2: TabDenti;
}
