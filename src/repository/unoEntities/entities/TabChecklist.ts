import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MCureChecklist } from "./MCureChecklist";

@Index("IX_TAB-CHECKLIST", ["tipo", "ord", "descrizione", "id"], {
  unique: true,
})
@Index("PK_TAB-CHECKLIST", ["id"], { unique: true })
@Entity("TAB-CHECKLIST", { schema: "dbo" })
export class TabChecklist {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Tipo", default: () => "(0)" })
  tipo: number;

  @Column("nvarchar", { name: "Descrizione", length: 200 })
  descrizione: string;

  @Column("smallint", { name: "Ord", default: () => "(0)" })
  ord: number;

  @Column("bit", { name: "StatoRecord", default: () => "(1)" })
  statoRecord: boolean;

  // @OneToMany(() => MCureChecklist, (mCureChecklist) => mCureChecklist.idCheck2)
  // mCureChecklists: MCureChecklist[];
}
