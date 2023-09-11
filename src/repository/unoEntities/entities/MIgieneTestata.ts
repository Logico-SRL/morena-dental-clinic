import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AAnagrafica, MIgienePsr, MIgieneRighe, TabOperatori, TabPerioSequenze } from ".";

@Index("IX_M-IGIENE-TESTATA", ["idAnagrafica", "dataRilevazioni"], {})
@Index("PK_M-IGIENE-TESTATA", ["id"], { unique: true })
@Entity("M-IGIENE-TESTATA", { schema: "dbo" })
export class MIgieneTestata {
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

  @Column("datetime", { name: "TimeStamp", nullable: true })
  timeStamp: Date | null;

  @OneToMany(() => MIgienePsr, (mIgienePsr) => mIgienePsr.idTestata2)
  mIgienePsrs: MIgienePsr[];

  @OneToMany(() => MIgieneRighe, (mIgieneRighe) => mIgieneRighe.idTestata2)
  mIgieneRighes: MIgieneRighe[];

  @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.mIgieneTestatas)
  @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  idAnagrafica2: AAnagrafica;

  @ManyToOne(
    () => TabPerioSequenze,
    (tabPerioSequenze) => tabPerioSequenze.mIgieneTestatas
  )
  @JoinColumn([{ name: "IDSequenza", referencedColumnName: "id" }])
  idSequenza: TabPerioSequenze;

  @ManyToOne(() => TabOperatori, (tabOperatori) => tabOperatori.mIgieneTestatas)
  @JoinColumn([{ name: "IDOperatore", referencedColumnName: "id" }])
  idOperatore: TabOperatori;
}
