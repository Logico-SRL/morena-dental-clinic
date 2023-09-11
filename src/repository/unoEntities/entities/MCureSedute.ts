import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MCurePiano } from "./MCurePiano";
import { MCureTestata } from "./MCureTestata";

@Index("IX_M-CURE-SEDUTE", ["idTestata", "nrRiga"], {})
@Index("M-CURE-SEDUTE_PK", ["id"], { unique: true })
@Entity("M-CURE-SEDUTE", { schema: "dbo" })
export class MCureSedute {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTestata" })
  idTestata: number;

  @Column("smallint", { name: "NrRiga", default: () => "(0)" })
  nrRiga: number;

  @Column("bit", { name: "IsGruppoBase" })
  isGruppoBase: boolean;

  @Column("int", { name: "IDImpegno", nullable: true })
  idImpegno: number | null;

  @Column("nchar", { name: "Titolo", nullable: true, length: 50 })
  titolo: string | null;

  @Column("smallint", {
    name: "GGsuccessivo",
    nullable: true,
    default: () => "(0)",
  })
  gGsuccessivo: number | null;

  @Column("datetime", { name: "DataSeduta", nullable: true })
  dataSeduta: Date | null;

  @Column("int", { name: "IDOperatore", nullable: true })
  idOperatore: number | null;

  @Column("smallint", {
    name: "DurataOp",
    nullable: true,
    default: () => "(0)",
  })
  durataOp: number | null;

  @Column("int", { name: "IDAssistente1", nullable: true })
  idAssistente1: number | null;

  @Column("smallint", {
    name: "DurataAs1",
    nullable: true,
    default: () => "(0)",
  })
  durataAs1: number | null;

  @Column("int", { name: "IDAssistente2", nullable: true })
  idAssistente2: number | null;

  @Column("smallint", {
    name: "DurataAs2",
    nullable: true,
    default: () => "(0)",
  })
  durataAs2: number | null;

  @Column("datetime", { name: "OraIN", nullable: true })
  oraIn: Date | null;

  @Column("datetime", { name: "OraOUT", nullable: true })
  oraOut: Date | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("bit", { name: "StatoRecord", default: () => "(1)" })
  statoRecord: boolean;

  @Column("smallint", { name: "DurataSeduta", nullable: true })
  durataSeduta: number | null;

  @OneToMany(() => MCurePiano, (mCurePiano) => mCurePiano.idSeduta)
  mCurePianos: MCurePiano[];

  @ManyToOne(() => MCureTestata, (mCureTestata) => mCureTestata.mCureSedutes)
  @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  idTestata2: MCureTestata;
}
