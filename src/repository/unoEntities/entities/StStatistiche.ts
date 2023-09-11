import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StStatisticheParams } from "./StStatisticheParams";

@Index("PK_ST-STATISTICHE", ["id"], { unique: true })
@Index("Statistica", ["tipo", "titolo"], {})
@Entity("ST-STATISTICHE", { schema: "dbo" })
export class StStatistiche {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Codice", nullable: true })
  codice: number | null;

  @Column("smallint", {
    name: "Ordinamento",
    nullable: true,
    default: () => "(0)",
  })
  ordinamento: number | null;

  @Column("smallint", { name: "Tipo", nullable: true, default: () => "(0)" })
  tipo: number | null;

  @Column("nvarchar", { name: "Titolo", nullable: true, length: 50 })
  titolo: string | null;

  @Column("ntext", { name: "Descrizione", nullable: true })
  descrizione: string | null;

  @Column("ntext", { name: "sqlSELECT", nullable: true })
  sqlSelect: string | null;

  @Column("ntext", { name: "sqlFROM", nullable: true })
  sqlFrom: string | null;

  @Column("ntext", { name: "sqlWHERE", nullable: true })
  sqlWhere: string | null;

  @Column("ntext", { name: "sqlGROUPBY", nullable: true })
  sqlGroupby: string | null;

  @Column("ntext", { name: "sqlORDERBY", nullable: true })
  sqlOrderby: string | null;

  @Column("ntext", { name: "LayOut", nullable: true })
  layOut: string | null;

  @Column("ntext", { name: "Totali", nullable: true })
  totali: string | null;

  @Column("bit", { name: "StatoRecord", default: () => "(0)" })
  statoRecord: boolean;

  @OneToMany(
    () => StStatisticheParams,
    (stStatisticheParams) => stStatisticheParams.idStatistica2
  )
  stStatisticheParams: StStatisticheParams[];
}
