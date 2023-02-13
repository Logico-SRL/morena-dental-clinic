import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MSterilizzazione } from "./MSterilizzazione";
import { TabTraydef } from "./TabTraydef";
import { MCureTestata } from "./MCureTestata";

@Index("IX_M-STERILIZZAZIONE-TRAY", ["idCiclo", "idTray", "idTestata"], {})
@Index("PK_M_TRAYMAG", ["id"], { unique: true })
@Entity("M-STERILIZZAZIONE-TRAY", { schema: "dbo" })
export class MSterilizzazioneTray {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDCiclo" })
  idCiclo: number;

  @Column("int", { name: "IDTray" })
  idTray: number;

  @Column("int", { name: "IDTestata", nullable: true })
  idTestata: number | null;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  @Column("int", { name: "Codice" })
  codice: number;

  @Column("date", { name: "Scadenza" })
  scadenza: Date;

  @Column("int", { name: "AnnoRiferimento" })
  annoRiferimento: number;

  @Column("datetime", { name: "UtilizzatoInData", nullable: true })
  utilizzatoInData: Date | null;

  // @ManyToOne(
  //   () => MSterilizzazione,
  //   (mSterilizzazione) => mSterilizzazione.mSterilizzazioneTrays
  // )
  // @JoinColumn([{ name: "IDCiclo", referencedColumnName: "id" }])
  // idCiclo2: MSterilizzazione;

  // @ManyToOne(() => TabTraydef, (tabTraydef) => tabTraydef.mSterilizzazioneTrays)
  // @JoinColumn([{ name: "IDTray", referencedColumnName: "id" }])
  // idTray2: TabTraydef;

  // @ManyToOne(
  //   () => MCureTestata,
  //   (mCureTestata) => mCureTestata.mSterilizzazioneTrays
  // )
  // @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  // idTestata2: MCureTestata;
}
