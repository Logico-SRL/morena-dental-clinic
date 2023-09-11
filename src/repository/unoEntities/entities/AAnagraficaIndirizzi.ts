import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AAnagrafica, TabComuni } from ".";

@Index("IX_A-ANAGRAFICA-INDIRIZZI", ["idAnagrafica"], {})
@Index("PK_A-ANAGRAFICA-INDIRIZZI", ["id"], { unique: true })
@Entity("A-ANAGRAFICA-INDIRIZZI", { schema: "dbo" })
export class AAnagraficaIndirizzi {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica" })
  idAnagrafica: number;

  @Column("nvarchar", { name: "Indirizzo", length: 50 })
  indirizzo: string;

  @Column("nvarchar", { name: "Frazione", nullable: true, length: 30 })
  frazione: string | null;

  @Column("nvarchar", { name: "CAP", nullable: true, length: 5 })
  cap: string | null;

  @Column("nvarchar", { name: "Provincia", nullable: true, length: 2 })
  provincia: string | null;

  @ManyToOne(
    () => AAnagrafica,
    (aAnagrafica) => aAnagrafica.aAnagraficaIndirizzis
  )
  @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  idAnagrafica2: AAnagrafica;

  @ManyToOne(() => TabComuni, (tabComuni) => tabComuni.aAnagraficaIndirizzis, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "IDComune", referencedColumnName: "id" }])
  idComune: TabComuni;
}
