import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IDisegnoSpecie } from "./IDisegnoSpecie";
import { IDisegnoElemento } from "./IDisegnoElemento";

@Index("PK_I-DISEGNO-COMPLESSIVO", ["id"], { unique: true })
@Entity("I-DISEGNO-COMPLESSIVO", { schema: "dbo" })
export class IDisegnoComplessivo {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 50 })
  name: string | null;

  @Column("real", {
    name: "NameX",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  nameX: number | null;

  @Column("real", {
    name: "NameY",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  nameY: number | null;

  @Column("real", {
    name: "NameFontRS",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  nameFontRs: number | null;

  @Column("real", {
    name: "Width",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  width: number | null;

  @Column("real", {
    name: "Height",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  height: number | null;

  @Column("smallint", {
    name: "RefResize",
    nullable: true,
    default: () => "(0)",
  })
  refResize: number | null;

  @Column("nvarchar", {
    name: "EditBackgFileName",
    nullable: true,
    length: 255,
  })
  editBackgFileName: string | null;

  @Column("nvarchar", { name: "Gruppo", nullable: true, length: 50 })
  gruppo: string | null;

  @Column("nvarchar", { name: "Famiglia", nullable: true, length: 50 })
  famiglia: string | null;

  @Column("nvarchar", { name: "Tipo", nullable: true, length: 50 })
  tipo: string | null;

  @Column("nvarchar", { name: "Aux1", nullable: true, length: 50 })
  aux1: string | null;

  @Column("nvarchar", { name: "Aux2", nullable: true, length: 50 })
  aux2: string | null;

  @Column("nvarchar", { name: "Aux3", nullable: true, length: 50 })
  aux3: string | null;

  @Column("smallint", { name: "Hide", nullable: true, default: () => "(4)" })
  hide: number | null;

  @ManyToOne(
    () => IDisegnoSpecie,
    (iDisegnoSpecie) => iDisegnoSpecie.iDisegnoComplessivos
  )
  @JoinColumn([{ name: "IDSpecie", referencedColumnName: "id" }])
  idSpecie: IDisegnoSpecie;

  @OneToMany(
    () => IDisegnoElemento,
    (iDisegnoElemento) => iDisegnoElemento.idComplessivo
  )
  iDisegnoElementos: IDisegnoElemento[];
}
