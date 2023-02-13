import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutcomActions } from "./AutcomActions";
import { AutcomRisposte } from "./AutcomRisposte";

@Index("IX_AUTCOM-MESSAGGI_MsgRecipient", ["msgRecipient"], {})
@Index("PK_AUTCOM-MESSAGGI", ["id"], { unique: true })
@Entity("AUTCOM-MESSAGGI", { schema: "dbo" })
export class AutcomMessaggi {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Type" })
  type: number;

  @Column("nvarchar", { name: "Name", length: 50 })
  name: string;

  @Column("nvarchar", { name: "SkPolicy", nullable: true })
  skPolicy: string | null;

  @Column("nvarchar", { name: "SkLifeTimeDays", length: 10 })
  skLifeTimeDays: string;

  @Column("int", { name: "SkSubmitIndex" })
  skSubmitIndex: number;

  @Column("smallint", { name: "Status" })
  status: number;

  @Column("nvarchar", { name: "MsgRecipient", length: 50 })
  msgRecipient: string;

  @Column("nvarchar", { name: "MsgText" })
  msgText: string;

  @Column("nvarchar", { name: "MsgOrderId", nullable: true, length: 40 })
  msgOrderId: string | null;

  @Column("smallint", { name: "ReplyValidationType" })
  replyValidationType: number;

  @Column("nvarchar", { name: "ReplyValidationMatch", nullable: true })
  replyValidationMatch: string | null;

  @Column("datetime", { name: "SendDate", nullable: true })
  sendDate: Date | null;

  @Column("datetime", { name: "StatusDate", nullable: true })
  statusDate: Date | null;

  @Column("smallint", { name: "ReplyMode", default: () => "(0)" })
  replyMode: number;

  // @ManyToOne(
  //   () => AutcomActions,
  //   (autcomActions) => autcomActions.autcomMessaggis
  // )
  // @JoinColumn([{ name: "ParentActionId", referencedColumnName: "id" }])
  // parentAction: AutcomActions;

  // @ManyToOne(
  //   () => AutcomRisposte,
  //   (autcomRisposte) => autcomRisposte.autcomMessaggis
  // )
  // @JoinColumn([{ name: "ReplyId", referencedColumnName: "id" }])
  // reply: AutcomRisposte;
}
