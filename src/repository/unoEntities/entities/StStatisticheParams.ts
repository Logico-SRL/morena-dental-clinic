import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StStatistiche } from "./StStatistiche";

@Index("IX_ST-STATISTICHE-PARMS", ["idStatistica", "id"], {})
@Index("PK_ST-STATISTICHE-PARMS", ["id"], { unique: true })
@Entity("ST-STATISTICHE-PARAMS", { schema: "dbo" })
export class StStatisticheParams {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDStatistica" })
  idStatistica: number;

  @Column("smallint", { name: "OrdInt", default: () => "(0)" })
  ordInt: number;

  @Column("smallint", { name: "Tipo" })
  tipo: number;

  @Column("nvarchar", { name: "Descrizione", length: 50 })
  descrizione: string;

  @Column("nvarchar", { name: "Default", nullable: true, length: 10 })
  default: string | null;

  @Column("ntext", { name: "Sql", nullable: true })
  sql: string | null;

  // @ManyToOne(
  //   () => StStatistiche,
  //   (stStatistiche) => stStatistiche.stStatisticheParams,
  //   { onDelete: "CASCADE", onUpdate: "CASCADE" }
  // )
  // @JoinColumn([{ name: "IDStatistica", referencedColumnName: "id" }])
  // idStatistica2: StStatistiche;
}
