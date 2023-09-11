import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { APazientiTag } from "./APazientiTag";

@Index("PK_TAB-TAG", ["id"], { unique: true })
@Entity("TAB-TAG", { schema: "dbo" })
export class TabTag {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Gruppo" })
  gruppo: number;

  @Column("nvarchar", { name: "Desc", length: 50 })
  desc: string;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  @OneToMany(() => APazientiTag, (aPazientiTag) => aPazientiTag.idtag2)
  aPazientiTags: APazientiTag[];
}
