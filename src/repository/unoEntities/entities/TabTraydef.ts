import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MSterilizzazioneTray } from "./MSterilizzazioneTray";

@Index("IX_TAB-TRAYDEF", ["tipo", "descrizione"], {})
@Index("PK_TAB-TRAYDEF", ["id"], { unique: true })
@Entity("TAB-TRAYDEF", { schema: "dbo" })
export class TabTraydef {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Tipo", length: 1 })
  tipo: string;

  @Column("nvarchar", { name: "Descrizione", length: 25 })
  descrizione: string;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  // @OneToMany(
  //   () => MSterilizzazioneTray,
  //   (mSterilizzazioneTray) => mSterilizzazioneTray.idTray2
  // )
  // mSterilizzazioneTrays: MSterilizzazioneTray[];
}
