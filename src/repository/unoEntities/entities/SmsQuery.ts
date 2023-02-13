import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_SMS-QUERY", ["id"], { unique: true })
@Entity("SMS-QUERY", { schema: "dbo" })
export class SmsQuery {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Cod" })
  cod: number;

  @Column("ntext", { name: "Testo" })
  testo: string;

  @Column("bit", { name: "UpdMode" })
  updMode: boolean;

  @Column("nvarchar", { name: "UpdDataSent", nullable: true, length: 20 })
  updDataSent: string | null;

  @Column("nvarchar", { name: "UpdDataReceived", nullable: true, length: 20 })
  updDataReceived: string | null;

  @Column("nvarchar", { name: "Subj", nullable: true, length: 300 })
  subj: string | null;
}
