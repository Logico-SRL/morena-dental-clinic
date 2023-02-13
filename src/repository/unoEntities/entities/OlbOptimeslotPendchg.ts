import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(
  "IX_OLB-OPTIMESLOT-PENDCHG_IdOp_TimeStamp",
  ["olbLastQueueTimeStamp", "idOperatore"],
  {}
)
@Index("PK_OLB-OPTIMESLOT-PENDCHG", ["id"], { unique: true })
@Entity("OLB-OPTIMESLOT-PENDCHG", { schema: "dbo" })
export class OlbOptimeslotPendchg {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IdOperatore", default: () => "(0)" })
  idOperatore: number;

  @Column("datetime", { name: "Data", nullable: true })
  data: Date | null;

  @Column("datetime", { name: "OLBLastQueueTimeStamp", nullable: true })
  olbLastQueueTimeStamp: Date | null;
}
