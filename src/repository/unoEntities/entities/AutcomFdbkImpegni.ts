import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IX_C-FDBK-IMPEGNI_AppId", ["appId"], { unique: true })
@Index("IX_C-FDBK-IMPEGNI_PendingStatus", ["pendingStatus"], {})
@Index("PK_AUTCOM-FDBK-IMPEGNI", ["id"], { unique: true })
@Entity("AUTCOM-FDBK-IMPEGNI", { schema: "dbo" })
export class AutcomFdbkImpegni {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "AppId" })
  appId: number;

  @Column("smallint", { name: "AppStatus" })
  appStatus: number;

  @Column("smallint", { name: "AppType" })
  appType: number;

  @Column("smallint", { name: "PendingStatus" })
  pendingStatus: number;
}
