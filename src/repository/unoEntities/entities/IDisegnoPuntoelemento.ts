import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IDisegnoElemento } from "./IDisegnoElemento";

@Index("PK_I-DISEGNO-PUNTOELEMENTO_1", ["id"], { unique: true })
@Entity("I-DISEGNO-PUNTOELEMENTO", { schema: "dbo" })
export class IDisegnoPuntoelemento {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Indice" })
  indice: number;

  @Column("real", { name: "X", precision: 24 })
  x: number;

  @Column("real", { name: "Y", precision: 24 })
  y: number;

  @ManyToOne(
    () => IDisegnoElemento,
    (iDisegnoElemento) => iDisegnoElemento.iDisegnoPuntoelementos
  )
  @JoinColumn([{ name: "IDElemento", referencedColumnName: "id" }])
  idElemento: IDisegnoElemento;
}
