import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { MOrtoTestata } from ".";

@Index("IX_M-ORTO-CEF", ["idTestata"], {})
@Index("PK_M-ORTO-CEF", ["id"], { unique: true })
@Entity("M-ORTO-CEF", { schema: "dbo" })
export class MOrtoCef {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTestata" })
  idTestata: number;

  @Column("int", { name: "IdCEF" })
  idCef: number;

  @Column("smallint", { name: "Valore" })
  valore: number;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  @ManyToOne(() => MOrtoTestata, (mOrtoTestata) => mOrtoTestata.mOrtoCefs)
  @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  idTestata2: MOrtoTestata;
}
