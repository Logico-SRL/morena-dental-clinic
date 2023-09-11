import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SmsGruppi } from "./SmsGruppi";
import { SmsMessaggiStatus } from "./SmsMessaggiStatus";

@Index("PK_SMS-MESSAGGI", ["id"], { unique: true })
@Entity("SMS-MESSAGGI", { schema: "dbo" })
export class SmsMessaggi {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Tipo", length: 1 })
  tipo: string;

  @Column("int", { name: "IDObj" })
  idObj: number;

  @Column("nvarchar", { name: "Destinatario", length: 70 })
  destinatario: string;

  @Column("nvarchar", { name: "Tel", length: 50 })
  tel: string;

  @Column("ntext", { name: "Testo" })
  testo: string;

  @Column("datetime", { name: "DataInvio", nullable: true })
  dataInvio: Date | null;

  @Column("datetime", { name: "DataSK", nullable: true })
  dataSk: Date | null;

  @Column("datetime", { name: "DataRicezione", nullable: true })
  dataRicezione: Date | null;

  @Column("smallint", { name: "Stato", nullable: true })
  stato: number | null;

  @Column("smallint", { name: "ReplyMode", default: () => "(0)" })
  replyMode: number;

  @Column("nvarchar", { name: "SentBy", nullable: true, length: 50 })
  sentBy: string | null;

  @ManyToOne(() => SmsGruppi, (smsGruppi) => smsGruppi.smsMessaggis)
  @JoinColumn([{ name: "IDGrp", referencedColumnName: "id" }])
  idGrp: SmsGruppi;

  @OneToMany(
    () => SmsMessaggiStatus,
    (smsMessaggiStatus) => smsMessaggiStatus.idMsg2
  )
  smsMessaggiStatuses: SmsMessaggiStatus[];
}
