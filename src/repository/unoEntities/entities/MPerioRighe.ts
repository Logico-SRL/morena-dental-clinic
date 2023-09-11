import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { MPerioTestata, TabPerioRilevazioni } from ".";

@Index("IX_M-PERIO-RIGHE", ["idTestata", "idRilevazione"], {})
@Index("PK_M-PERIO-RIGHE", ["id"], { unique: true })
@Entity("M-PERIO-RIGHE", { schema: "dbo" })
export class MPerioRighe {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTestata" })
  idTestata: number;

  @Column("int", { name: "IDRilevazione" })
  idRilevazione: number;

  @Column("int", { name: "Valore" })
  valore: number;

  @ManyToOne(() => MPerioTestata, (mPerioTestata) => mPerioTestata.mPerioRighes)
  @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  idTestata2: MPerioTestata;

  @ManyToOne(
    () => TabPerioRilevazioni,
    (tabPerioRilevazioni) => tabPerioRilevazioni.mPerioRighes
  )
  @JoinColumn([{ name: "IDRilevazione", referencedColumnName: "id" }])
  idRilevazione2: TabPerioRilevazioni;
}
