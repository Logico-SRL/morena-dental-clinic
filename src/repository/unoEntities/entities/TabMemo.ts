import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { APazientiMemo } from "./APazientiMemo";

@Index("PK_TAB-MEMO", ["id"], { unique: true })
@Entity("TAB-MEMO", { schema: "dbo" })
export class TabMemo {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Memo", nullable: true, length: 50 })
  memo: string | null;

  @Column("nvarchar", { name: "FlSesso", nullable: true, length: 1 })
  flSesso: string | null;

  @Column("smallint", { name: "Gruppo", nullable: true })
  gruppo: number | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  // @OneToMany(() => APazientiMemo, (aPazientiMemo) => aPazientiMemo.idMemo2)
  // aPazientiMemos: APazientiMemo[];
}
