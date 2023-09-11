import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { MCureTestata, TabChecklist } from ".";

@Index("IX_M-CURE-CHECKLIST", ["idTestata", "idCheck"], { unique: true })
@Index("PK_M-CURE-CHECKLIST", ["id"], { unique: true })
@Entity("M-CURE-CHECKLIST", { schema: "dbo" })
export class MCureChecklist {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IdTestata" })
  idTestata: number;

  @Column("int", { name: "IdCheck" })
  idCheck: number;

  @Column("bit", { name: "Stato", nullable: true, default: () => "(0)" })
  stato: boolean | null;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  @ManyToOne(() => MCureTestata, (mCureTestata) => mCureTestata.mCureChecklists)
  @JoinColumn([{ name: "IdTestata", referencedColumnName: "id" }])
  idTestata2: MCureTestata;

  @ManyToOne(() => TabChecklist, (tabChecklist) => tabChecklist.mCureChecklists)
  @JoinColumn([{ name: "IdCheck", referencedColumnName: "id" }])
  idCheck2: TabChecklist;
}
