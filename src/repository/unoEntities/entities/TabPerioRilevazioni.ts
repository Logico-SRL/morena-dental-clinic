import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { MIgieneRighe, MPerioRighe, TabPerioSequenze } from ".";

@Index("PK_M-PERIO-RILEVAZIONI", ["id"], { unique: true })
@Entity("TAB-PERIO-RILEVAZIONI", { schema: "dbo" })
export class TabPerioRilevazioni {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDDente" })
  idDente: number;

  @Column("smallint", { name: "Tipo" })
  tipo: number;

  @Column("smallint", { name: "Posizione" })
  posizione: number;

  @Column("int", { name: "Ordine" })
  ordine: number;

  @OneToMany(() => MIgieneRighe, (mIgieneRighe) => mIgieneRighe.idRilevazione2)
  mIgieneRighes: MIgieneRighe[];

  @OneToMany(() => MPerioRighe, (mPerioRighe) => mPerioRighe.idRilevazione2)
  mPerioRighes: MPerioRighe[];

  @ManyToOne(
    () => TabPerioSequenze,
    (tabPerioSequenze) => tabPerioSequenze.tabPerioRilevazionis
  )
  @JoinColumn([{ name: "IDSequenza", referencedColumnName: "id" }])
  idSequenza: TabPerioSequenze;
}
