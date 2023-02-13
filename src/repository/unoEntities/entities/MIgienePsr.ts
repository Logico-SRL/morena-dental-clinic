import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MIgieneTestata } from "./MIgieneTestata";
import { TabAnamnesi } from "./TabAnamnesi";

@Index("IX_M-IGIENE-PSR", ["idTestata", "idQuesito"], { unique: true })
@Index("PK_M-IGIENE-PSR", ["id"], { unique: true })
@Entity("M-IGIENE-PSR", { schema: "dbo" })
export class MIgienePsr {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IdTestata" })
  idTestata: number;

  @Column("int", { name: "IdQuesito" })
  idQuesito: number;

  @Column("nvarchar", { name: "Nota", nullable: true, length: 4 })
  nota: string | null;

  @Column("nvarchar", { name: "Valore", nullable: true, length: 2 })
  valore: string | null;

  // @ManyToOne(
  //   () => MIgieneTestata,
  //   (mIgieneTestata) => mIgieneTestata.mIgienePsrs
  // )
  // @JoinColumn([{ name: "IdTestata", referencedColumnName: "id" }])
  // idTestata2: MIgieneTestata;

  // @ManyToOne(() => TabAnamnesi, (tabAnamnesi) => tabAnamnesi.mIgienePsrs)
  // @JoinColumn([{ name: "IdQuesito", referencedColumnName: "id" }])
  // idQuesito2: TabAnamnesi;
}
