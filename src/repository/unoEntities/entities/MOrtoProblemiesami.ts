import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MOrtoTestata } from "./MOrtoTestata";

@Index("IX_M-ORTO-PROBLEMIESAMI", ["idTestata", "tipo", "idPe", "idEl"], {})
@Index("PK_M-ORTO-PROBLEMIESAMI", ["id"], { unique: true })
@Entity("M-ORTO-PROBLEMIESAMI", { schema: "dbo" })
export class MOrtoProblemiesami {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTestata" })
  idTestata: number;

  @Column("int", { name: "Tipo" })
  tipo: number;

  @Column("int", { name: "IdPE" })
  idPe: number;

  @Column("int", { name: "IdEL" })
  idEl: number;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  // @ManyToOne(
  //   () => MOrtoTestata,
  //   (mOrtoTestata) => mOrtoTestata.mOrtoProblemiesamis
  // )
  // @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  // idTestata2: MOrtoTestata;
}
