import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_SMS-ORDINICREDITI", ["id"], { unique: true })
@Entity("SMS-ORDINICREDITI", { schema: "dbo" })
export class SmsOrdinicrediti {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Provider", length: 50 })
  provider: string;

  @Column("int", { name: "Quantity" })
  quantity: number;

  @Column("int", { name: "Credits" })
  credits: number;

  @Column("datetime", { name: "Date" })
  date: Date;

  @Column("nvarchar", { name: "CustomerUser", nullable: true })
  customerUser: string | null;

  @Column("nvarchar", { name: "CustomerPwd", nullable: true })
  customerPwd: string | null;

  @Column("nvarchar", { name: "CustomerCode", nullable: true })
  customerCode: string | null;

  @Column("bit", { name: "IsAuto" })
  isAuto: boolean;

  @Column("nvarchar", { name: "IssuedBy", nullable: true })
  issuedBy: string | null;
}
