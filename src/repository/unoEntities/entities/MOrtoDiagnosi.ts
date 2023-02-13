import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MOrtoTestata } from "./MOrtoTestata";

@Index("IX_M-ORTO-DIAGNOSI", ["idTestata"], {})
@Index("PK_M-ORTO-DIAGNOSI", ["id"], { unique: true })
@Entity("M-ORTO-DIAGNOSI", { schema: "dbo" })
export class MOrtoDiagnosi {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTestata" })
  idTestata: number;

  @Column("int", { name: "IdQuesito" })
  idQuesito: number;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  @Column("nvarchar", { name: "Valore", nullable: true, length: 10 })
  valore: string | null;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  // @ManyToOne(() => MOrtoTestata, (mOrtoTestata) => mOrtoTestata.mOrtoDiagnosis)
  // @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  // idTestata2: MOrtoTestata;
}
