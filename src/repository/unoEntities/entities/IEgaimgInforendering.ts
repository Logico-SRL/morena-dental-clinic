import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IEga } from "./IEga";

@Index("PK_I-EGAIMG-INFORENDERING", ["id"], { unique: true })
@Entity("I-EGAIMG-INFORENDERING", { schema: "dbo" })
export class IEgaimgInforendering {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Tipo" })
  tipo: number;

  @Column("smallint", { name: "ImgTipoIndice" })
  imgTipoIndice: number;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 50 })
  descrizione: string | null;

  @Column("ntext", { name: "Valore", nullable: true })
  valore: string | null;

  // @ManyToOne(() => IEga, (iEga) => iEga.iEgaimgInforenderings)
  // @JoinColumn([{ name: "IDEGAIMG", referencedColumnName: "id" }])
  // idegaimg: IEga;
}
