import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_OLB-SVCWSP", ["id"], { unique: true })
@Entity("OLB-SVCWSP", { schema: "dbo" })
export class OlbSvcwsp {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Chiave", length: 4 })
  chiave: string;

  @Column("int", { name: "Ord", default: () => "(0)" })
  ord: number;

  @Column("nvarchar", { name: "Campo1", nullable: true, length: 50 })
  campo1: string | null;

  @Column("nvarchar", { name: "Campo2", nullable: true, length: 50 })
  campo2: string | null;

  @Column("nvarchar", { name: "Campo3", nullable: true, length: 50 })
  campo3: string | null;

  @Column("bit", { name: "StatoRecord" })
  statoRecord: boolean;
}
