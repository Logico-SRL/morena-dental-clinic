import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AutcomMessaggi } from ".";

@Index("PK_AUTCOM-RISPOSTE", ["id"], { unique: true })
@Entity("AUTCOM-RISPOSTE", { schema: "dbo" })
export class AutcomRisposte {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Type" })
  type: number;

  @Column("nvarchar", { name: "OrderId", length: 70 })
  orderId: string;

  @Column("nvarchar", { name: "Sender", length: 50 })
  sender: string;

  @Column("nvarchar", { name: "Text" })
  text: string;

  @Column("datetime", { name: "SendDate" })
  sendDate: Date;

  @Column("datetime", { name: "ValidationDate", nullable: true })
  validationDate: Date | null;

  @Column("int", { name: "ValidationRepliedMsgId" })
  validationRepliedMsgId: number;

  @Column("int", { name: "ValidationOperatorId" })
  validationOperatorId: number;

  @Column("int", { name: "ViewedFirstByOperatorId", default: () => "(0)" })
  viewedFirstByOperatorId: number;

  @OneToMany(() => AutcomMessaggi, (autcomMessaggi) => autcomMessaggi.reply)
  autcomMessaggis: AutcomMessaggi[];
}
