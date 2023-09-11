import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AAnagrafica, MOrtoCef, MOrtoDiagnosi, MOrtoFormula, MOrtoProblemiesami, TabOperatori } from ".";

@Index("IX_M-ORTO-TESTATA", ["idAnagrafica", "dataInizio"], {})
@Index("PK_M-ORTO-TESTATA", ["id"], { unique: true })
@Entity("M-ORTO-TESTATA", { schema: "dbo" })
export class MOrtoTestata {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "IdInterno" })
  idInterno: number;

  @Column("int", { name: "IDAnagrafica" })
  idAnagrafica: number;

  @Column("int", { name: "IDSoluzione" })
  idSoluzione: number;

  @Column("smallint", { name: "TempoTratt", nullable: true })
  tempoTratt: number | null;

  @Column("nvarchar", { name: "NoteT", nullable: true, length: 50 })
  noteT: string | null;

  @Column("smallint", { name: "TempoCont", nullable: true })
  tempoCont: number | null;

  @Column("nvarchar", { name: "NoteC", nullable: true, length: 50 })
  noteC: string | null;

  @Column("nvarchar", { name: "Collaborazione", nullable: true, length: 50 })
  collaborazione: string | null;

  @Column("smallint", { name: "Difficoltà", nullable: true })
  difficolt: number | null;

  @Column("smallint", { name: "Controlli", nullable: true })
  controlli: number | null;

  @Column("datetime", { name: "DataInizio", nullable: true })
  dataInizio: Date | null;

  @Column("datetime", { name: "DataSospensione", nullable: true })
  dataSospensione: Date | null;

  @Column("datetime", { name: "DataSospensione2", nullable: true })
  dataSospensione2: Date | null;

  @Column("datetime", { name: "DataTermine", nullable: true })
  dataTermine: Date | null;

  @Column("datetime", { name: "DataContenzione", nullable: true })
  dataContenzione: Date | null;

  @Column("ntext", { name: "Motivazioni", nullable: true })
  motivazioni: string | null;

  @Column("ntext", { name: "Osservazioni", nullable: true })
  osservazioni: string | null;

  @Column("ntext", { name: "Diagnosi", nullable: true })
  diagnosi: string | null;

  @Column("ntext", { name: "Obiettivi", nullable: true })
  obiettivi: string | null;

  @Column("ntext", { name: "Previsione", nullable: true })
  previsione: string | null;

  @Column("ntext", { name: "DiarioClinico", nullable: true })
  diarioClinico: string | null;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  @OneToMany(() => MOrtoCef, (mOrtoCef) => mOrtoCef.idTestata2)
  mOrtoCefs: MOrtoCef[];

  @OneToMany(() => MOrtoDiagnosi, (mOrtoDiagnosi) => mOrtoDiagnosi.idTestata2)
  mOrtoDiagnosis: MOrtoDiagnosi[];

  @OneToMany(() => MOrtoFormula, (mOrtoFormula) => mOrtoFormula.idTestata2)
  mOrtoFormulas: MOrtoFormula[];

  @OneToMany(
    () => MOrtoProblemiesami,
    (mOrtoProblemiesami) => mOrtoProblemiesami.idTestata2
  )
  mOrtoProblemiesamis: MOrtoProblemiesami[];

  @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.mOrtoTestatas)
  @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  idAnagrafica2: AAnagrafica;

  @ManyToOne(() => TabOperatori, (tabOperatori) => tabOperatori.mOrtoTestatas)
  @JoinColumn([{ name: "IDOperatore", referencedColumnName: "id" }])
  idOperatore: TabOperatori;
}
