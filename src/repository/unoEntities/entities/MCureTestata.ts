import {
  Column,
  Entity,
  Index, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AAnagrafica, MCureAllegati, MCureChecklist, MCureRighe, MCureSedute, MPrescrizioni, MSterilizzazioneTray } from ".";


@Index("IX_M-CURE-TESTATA", ["idAnagrafica"], {})
@Index("PK_M-CURE-TESTATA", ["id"], { unique: true })
@Entity("M-CURE-TESTATA", { schema: "dbo" })
export class MCureTestata {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica" })
  idAnagrafica: number;

  @Column("smallint", { name: "TipoDocumento", default: () => "(0)" })
  tipoDocumento: number;

  @Column("nvarchar", { name: "Titolo", nullable: true, length: 25 })
  titolo: string | null;

  @Column("int", { name: "IDListino", nullable: true })
  idListino: number | null;

  @Column("int", { name: "IDPagamento", nullable: true })
  idPagamento: number | null;

  @Column("smallint", {
    name: "Validità",
    nullable: true,
    default: () => "(0)",
  })
  validit: number | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("money", {
    name: "TotaleDocumento",
    nullable: true,
    default: () => "(0)",
  })
  totaleDocumento: number | null;

  @Column("money", {
    name: "AbbuonoPreventivo",
    nullable: true,
    default: () => "(0)",
  })
  abbuonoPreventivo: number | null;

  @Column("money", { name: "AbbuonoFatture", nullable: true })
  abbuonoFatture: number | null;

  @Column("nvarchar", { name: "Divisa", nullable: true, length: 4 })
  divisa: string | null;

  @Column("int", { name: "IDOperatore", nullable: true })
  idOperatore: number | null;

  @Column("datetime", { name: "DataCreazione", nullable: true })
  dataCreazione: Date | null;

  @Column("datetime", { name: "DataAccettazione", nullable: true })
  dataAccettazione: Date | null;

  @Column("datetime", { name: "DataStoricizzazione", nullable: true })
  dataStoricizzazione: Date | null;

  @Column("int", { name: "IDcont", nullable: true })
  iDcont: number | null;

  @Column("bit", { name: "Locked", default: () => "(0)" })
  locked: boolean;

  @Column("bit", { name: "StatoRecord", default: () => "(1)" })
  statoRecord: boolean;

  @Column("int", { name: "IDListino2", nullable: true })
  idListino2: number | null;

  @Column("int", { name: "IDProponente", nullable: true })
  idProponente: number | null;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;

  @OneToMany(() => MCureAllegati, (mCureAllegati) => mCureAllegati.idTestata2)
  mCureAllegatis: MCureAllegati[];

  @OneToMany(
    () => MCureChecklist,
    (mCureChecklist) => mCureChecklist.idTestata2
  )
  mCureChecklists: MCureChecklist[];

  @OneToMany(() => MCureRighe, (mCureRighe) => mCureRighe.idTestata2)
  mCureRighes: MCureRighe[];

  @OneToMany(() => MCureSedute, (mCureSedute) => mCureSedute.idTestata2)
  mCureSedutes: MCureSedute[];

  @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.mCureTestatas)
  @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  idAnagrafica2: AAnagrafica;

  @OneToMany(() => MPrescrizioni, (mPrescrizioni) => mPrescrizioni.idTestata)
  mPrescrizionis: MPrescrizioni[];

  @OneToMany(
    () => MSterilizzazioneTray,
    (mSterilizzazioneTray) => mSterilizzazioneTray.idTestata2
  )
  mSterilizzazioneTrays: MSterilizzazioneTray[];
}
