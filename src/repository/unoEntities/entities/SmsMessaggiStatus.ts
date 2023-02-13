import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SmsMessaggi } from "./SmsMessaggi";

@Index("IX_SMS-MESSAGGI-STATUS", ["idMsg"], {})
@Index("PK_SMS-MESSAGGI-STATUS", ["id"], { unique: true })
@Entity("SMS-MESSAGGI-STATUS", { schema: "dbo" })
export class SmsMessaggiStatus {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDMsg" })
  idMsg: number;

  @Column("nvarchar", { name: "vOrderID", nullable: true, length: 40 })
  vOrderId: string | null;

  @Column("datetime", { name: "vDataOraStato", nullable: true })
  vDataOraStato: Date | null;

  @Column("nchar", { name: "vStato", nullable: true, length: 5 })
  vStato: string | null;

  // @ManyToOne(
  //   () => SmsMessaggi,
  //   (smsMessaggi) => smsMessaggi.smsMessaggiStatuses
  // )
  // @JoinColumn([{ name: "IDMsg", referencedColumnName: "id" }])
  // idMsg2: SmsMessaggi;
}
