import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SmsMessaggi } from "./SmsMessaggi";

@Index("PK_SMS-GRUPPI", ["id"], { unique: true })
@Entity("SMS-GRUPPI", { schema: "dbo" })
export class SmsGruppi {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDSocietà" })
  idSociet: number;

  @Column("date", { name: "Data" })
  data: Date;

  @Column("nvarchar", { name: "Titolo", length: 30 })
  titolo: string;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("smallint", { name: "Tipo", nullable: true })
  tipo: number | null;

  @Column("int", { name: "IdAnagrafica", default: () => "(0)" })
  idAnagrafica: number;

  @OneToMany(() => SmsMessaggi, (smsMessaggi) => smsMessaggi.idGrp)
  smsMessaggis: SmsMessaggi[];
}
