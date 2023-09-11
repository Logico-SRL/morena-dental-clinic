import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MCureRighe } from "./MCureRighe";
import { TabDenti } from "./TabDenti";

@Index("IX_M-CURE-RIGHE-DENTI", ["idCureRighe", "idDente"], {})
@Index("PK_M-CURE-RIGHE-DENTI", ["id"], { unique: true })
@Entity("M-CURE-RIGHE-DENTI", { schema: "dbo" })
export class MCureRigheDenti {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDCureRighe" })
  idCureRighe: number;

  @Column("smallint", { name: "IDDente" })
  idDente: number;

  @ManyToOne(() => MCureRighe, (mCureRighe) => mCureRighe.mCureRigheDentis)
  @JoinColumn([{ name: "IDCureRighe", referencedColumnName: "id" }])
  idCureRighe2: MCureRighe;

  @ManyToOne(() => TabDenti, (tabDenti) => tabDenti.mCureRigheDentis)
  @JoinColumn([{ name: "IDDente", referencedColumnName: "id" }])
  idDente2: TabDenti;
}
