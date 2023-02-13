import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MIgieneTestata } from "./MIgieneTestata";
import { TabPerioRilevazioni } from "./TabPerioRilevazioni";

@Index("IX_M-IGIENE-RIGHE", ["idTestata", "idRilevazione"], {})
@Index("PK_M-IGIENE-RIGHE", ["id"], { unique: true })
@Entity("M-IGIENE-RIGHE", { schema: "dbo" })
export class MIgieneRighe {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTestata" })
  idTestata: number;

  @Column("int", { name: "IDRilevazione" })
  idRilevazione: number;

  @Column("int", { name: "Valore" })
  valore: number;

  // @ManyToOne(
  //   () => MIgieneTestata,
  //   (mIgieneTestata) => mIgieneTestata.mIgieneRighes
  // )
  // @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  // idTestata2: MIgieneTestata;

  // @ManyToOne(
  //   () => TabPerioRilevazioni,
  //   (tabPerioRilevazioni) => tabPerioRilevazioni.mIgieneRighes
  // )
  // @JoinColumn([{ name: "IDRilevazione", referencedColumnName: "id" }])
  // idRilevazione2: TabPerioRilevazioni;
}
