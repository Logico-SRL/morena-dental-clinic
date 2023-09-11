import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AAnagrafica, MPerioRighe, TabOperatori, TabPerioSequenze } from ".";

@Index("IX_M-PERIO-TESTATA", ["idAnagrafica", "dataRilevazioni"], {})
@Index("PK_M-PERIO-TESTATA", ["id"], { unique: true })
@Entity("M-PERIO-TESTATA", { schema: "dbo" })
export class MPerioTestata {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica" })
  idAnagrafica: number;

  @Column("date", { name: "DataRilevazioni" })
  dataRilevazioni: Date;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("nvarchar", { name: "Titolo", nullable: true, length: 50 })
  titolo: string | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  @Column("datetime", { name: "Timestamp", nullable: true })
  timestamp: Date | null;

  @OneToMany(() => MPerioRighe, (mPerioRighe) => mPerioRighe.idTestata2)
  mPerioRighes: MPerioRighe[];

  @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.mPerioTestatas)
  @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  idAnagrafica2: AAnagrafica;

  @ManyToOne(
    () => TabPerioSequenze,
    (tabPerioSequenze) => tabPerioSequenze.mPerioTestatas
  )
  @JoinColumn([{ name: "IDSequenza", referencedColumnName: "id" }])
  idSequenza: TabPerioSequenze;

  @ManyToOne(() => TabOperatori, (tabOperatori) => tabOperatori.mPerioTestatas)
  @JoinColumn([{ name: "IDOperatore", referencedColumnName: "id" }])
  idOperatore: TabOperatori;
}
