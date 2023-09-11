import {
  Column,
  Entity,
  Index, PrimaryGeneratedColumn
} from "typeorm";
// import { MCureRighe } from "./MCureRighe";
// import { MCureSedute } from "./MCureSedute";

@Index("PK_M-CURE-PIANO", ["id"], { unique: true })
@Entity("M-CURE-PIANO", { schema: "dbo" })
export class MCurePiano {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "NrRiga", default: () => "(0)" })
  nrRiga: number;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 100 })
  descrizione: string | null;

  @Column("smallint", { name: "Durata", nullable: true, default: () => "(0)" })
  durata: number | null;

  @Column("smallint", {
    name: "Fleseguito",
    nullable: true,
    default: () => "(0)",
  })
  fleseguito: number | null;

  @Column("datetime", { name: "DataEsecuzione", nullable: true })
  dataEsecuzione: Date | null;

  @Column("datetime", { name: "OraEsecuzione", nullable: true })
  oraEsecuzione: Date | null;

  @Column("smallint", {
    name: "DurataReale",
    nullable: true,
    default: () => "(0)",
  })
  durataReale: number | null;

  @Column("money", {
    name: "ProduzioneStimata",
    nullable: true,
    default: () => "(0)",
  })
  produzioneStimata: number | null;

  @Column("money", {
    name: "ProduzioneReale",
    nullable: true,
    default: () => "(0)",
  })
  produzioneReale: number | null;

  @Column("int", { name: "IDOperatore", nullable: true })
  idOperatore: number | null;

  @Column("int", { name: "IDPostazione", nullable: true })
  idPostazione: number | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("bit", { name: "StatoRecord", default: () => "(1)" })
  statoRecord: boolean;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;

  // @ManyToOne(() => MCureRighe, (mCureRighe) => mCureRighe.mCurePianos)
  // @JoinColumn([{ name: "IDCureRighe", referencedColumnName: "id" }])
  // idCureRighe: MCureRighe;

  // @ManyToOne(() => MCureSedute, (mCureSedute) => mCureSedute.mCurePianos)
  // @JoinColumn([{ name: "IDSeduta", referencedColumnName: "id" }])
  // idSeduta: MCureSedute;
}
