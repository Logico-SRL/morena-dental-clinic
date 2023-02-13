import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MOrtoTestata } from "./MOrtoTestata";

@Index("IX_M-ORTO-FORMULA", ["idTestata", "idDente"], {})
@Index("PK_M-ORTO-FORMULA", ["id"], { unique: true })
@Entity("M-ORTO-FORMULA", { schema: "dbo" })
export class MOrtoFormula {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTestata" })
  idTestata: number;

  @Column("smallint", { name: "IDDente" })
  idDente: number;

  @Column("nvarchar", { name: "Dati", nullable: true, length: 10 })
  dati: string | null;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  // @ManyToOne(() => MOrtoTestata, (mOrtoTestata) => mOrtoTestata.mOrtoFormulas)
  // @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  // idTestata2: MOrtoTestata;
}
