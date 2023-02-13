import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IEga } from "./IEga";
import { ILaymodStruttura } from "./ILaymodStruttura";

@Index("PK_I-LAYMOD-NOME", ["id"], { unique: true })
@Entity("I-LAYMOD-NOME", { schema: "dbo" })
export class ILaymodNome {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", {
    name: "Nome",
    nullable: true,
    length: 50,
    default: () => "''",
  })
  nome: string | null;

  @Column("int", { name: "TipoRecord", nullable: true })
  tipoRecord: number | null;

  // @OneToMany(() => IEga, (iEga) => iEga.idModelloGruppo)
  // iEgas: IEga[];

  // @OneToMany(
  //   () => ILaymodStruttura,
  //   (iLaymodStruttura) => iLaymodStruttura.idModello
  // )
  // iLaymodStrutturas: ILaymodStruttura[];
}
