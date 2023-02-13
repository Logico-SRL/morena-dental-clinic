import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IX_C-FDBK-RICHIAMI_PendingStatus", ["pendingStatus"], {})
@Index("IX_C-FDBK-RICHIAMI_RichiamoId", ["richiamoId"], { unique: true })
@Index("PK_AUTCOM-FDBK-RICHIAMI", ["id"], { unique: true })
@Entity("AUTCOM-FDBK-RICHIAMI", { schema: "dbo" })
export class AutcomFdbkRichiami {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "RichiamoId" })
  richiamoId: number;

  @Column("smallint", { name: "RichiamoStatus" })
  richiamoStatus: number;

  @Column("smallint", { name: "PendingStatus" })
  pendingStatus: number;
}
