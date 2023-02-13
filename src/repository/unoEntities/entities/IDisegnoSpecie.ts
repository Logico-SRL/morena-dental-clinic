import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IDisegnoComplessivo } from "./IDisegnoComplessivo";

@Index("PK_I-DISEGNO-SPECIE", ["id"], { unique: true })
@Entity("I-DISEGNO-SPECIE", { schema: "dbo" })
export class IDisegnoSpecie {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Categoria" })
  categoria: number;

  @Column("nvarchar", { name: "Nome", nullable: true, length: 50 })
  nome: string | null;

  @Column("nvarchar", { name: "TitoloParamGruppo", nullable: true, length: 50 })
  titoloParamGruppo: string | null;

  @Column("nvarchar", {
    name: "TitoloParamFamiglia",
    nullable: true,
    length: 50,
  })
  titoloParamFamiglia: string | null;

  @Column("nvarchar", { name: "TitoloParamTipo", nullable: true, length: 50 })
  titoloParamTipo: string | null;

  @Column("nvarchar", { name: "TitoloParamAux1", nullable: true, length: 50 })
  titoloParamAux1: string | null;

  @Column("nvarchar", { name: "TitoloParamAux2", nullable: true, length: 50 })
  titoloParamAux2: string | null;

  @Column("nvarchar", { name: "TitoloParamAux3", nullable: true, length: 50 })
  titoloParamAux3: string | null;

  // @OneToMany(
  //   () => IDisegnoComplessivo,
  //   (iDisegnoComplessivo) => iDisegnoComplessivo.idSpecie
  // )
  // iDisegnoComplessivos: IDisegnoComplessivo[];
}
