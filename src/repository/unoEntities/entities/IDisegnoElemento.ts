import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IDisegnoComplessivo } from "./IDisegnoComplessivo";
import { IDisegnoPuntoelemento } from "./IDisegnoPuntoelemento";

@Index("PK_I-DISEGNO-ELEMENTO", ["id"], { unique: true })
@Entity("I-DISEGNO-ELEMENTO", { schema: "dbo" })
export class IDisegnoElemento {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "IDTipo" })
  idTipo: number;

  @Column("int", { name: "Colore" })
  colore: number;

  @Column("smallint", { name: "Spessore" })
  spessore: number;

  @Column("ntext", { name: "Testo", nullable: true })
  testo: string | null;

  @ManyToOne(
    () => IDisegnoComplessivo,
    (iDisegnoComplessivo) => iDisegnoComplessivo.iDisegnoElementos
  )
  @JoinColumn([{ name: "IDComplessivo", referencedColumnName: "id" }])
  idComplessivo: IDisegnoComplessivo;

  @OneToMany(
    () => IDisegnoPuntoelemento,
    (iDisegnoPuntoelemento) => iDisegnoPuntoelemento.idElemento
  )
  iDisegnoPuntoelementos: IDisegnoPuntoelemento[];
}
