import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IX_AG-ORARI", ["tipo", "data", "idOperatore"], {})
@Index("IX_AG-ORARI1", ["tipo", "idOperatore", "data"], {})
@Index("PK_AG-ORARI", ["id"], { unique: true })
@Entity("AG-ORARI", { schema: "dbo" })
export class AgOrari {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Tipo", default: () => "(1)" })
  tipo: number;

  @Column("nvarchar", { name: "Data", nullable: true, length: 10 })
  data: string | null;

  @Column("int", { name: "IdOperatore", nullable: true, default: () => "(0)" })
  idOperatore: number | null;

  @Column("time", { name: "OraInizio", nullable: true })
  oraInizio: Date | null;

  @Column("time", { name: "OraFine", nullable: true })
  oraFine: Date | null;

  @Column("smallint", { name: "weekDay", nullable: true })
  weekDay: number | null;

  @Column("bit", { name: "IsPM" })
  isPm: boolean;

  @Column("nvarchar", { name: "Info", nullable: true })
  info: string | null;
}
