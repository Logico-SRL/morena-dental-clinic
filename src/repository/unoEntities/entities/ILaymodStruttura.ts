import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ILaymodNome } from "./ILaymodNome";

@Index("PK_I-LAYMOD-STRUTTURA", ["id"], { unique: true })
@Entity("I-LAYMOD-STRUTTURA", { schema: "dbo" })
export class ILaymodStruttura {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Pos", default: () => "(0)" })
  pos: number;

  @Column("int", { name: "TopFr", nullable: true, default: () => "(0)" })
  topFr: number | null;

  @Column("int", { name: "LeftFr", nullable: true, default: () => "(0)" })
  leftFr: number | null;

  @Column("int", { name: "WidthFr", nullable: true, default: () => "(0)" })
  widthFr: number | null;

  @Column("int", { name: "HeightFr", nullable: true, default: () => "(0)" })
  heightFr: number | null;

  @Column("int", { name: "XRes", nullable: true, default: () => "(0)" })
  xRes: number | null;

  @Column("int", { name: "YRes", nullable: true, default: () => "(0)" })
  yRes: number | null;

  @Column("nvarchar", { name: "DenteArcata", nullable: true, length: 29 })
  denteArcata: string | null;

  @Column("smallint", { name: "AcqIndex", nullable: true })
  acqIndex: number | null;

  @ManyToOne(() => ILaymodNome, (iLaymodNome) => iLaymodNome.iLaymodStrutturas)
  @JoinColumn([{ name: "IDModello", referencedColumnName: "id" }])
  idModello: ILaymodNome;
}
