import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MCureRighe } from "./MCureRighe";

@Index("IX_M-CURE-RIGHE-NOTECLINICHE", ["idCureRighe"], {})
@Index("PK_M-CURE-RIGHE-NOTECLINICHE", ["id"], { unique: true })
@Entity("M-CURE-RIGHE-NOTECLINICHE", { schema: "dbo" })
export class MCureRigheNotecliniche {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDCureRighe" })
  idCureRighe: number;

  @Column("int", { name: "NrRiga" })
  nrRiga: number;

  @Column("smallint", { name: "TipoNota" })
  tipoNota: number;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 100 })
  descrizione: string | null;

  @Column("bit", { name: "StatoRecord", default: () => "(0)" })
  statoRecord: boolean;

  // @ManyToOne(
  //   () => MCureRighe,
  //   (mCureRighe) => mCureRighe.mCureRigheNotecliniches
  // )
  // @JoinColumn([{ name: "IDCureRighe", referencedColumnName: "id" }])
  // idCureRighe2: MCureRighe;
}
