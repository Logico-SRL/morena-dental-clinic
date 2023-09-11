import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AAnagrafica } from ".";

@Index("PK_C-RATE", ["id"], { unique: true })
@Entity("C-RATE", { schema: "dbo" })
export class CRate {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("datetime", { name: "DataScadenza", nullable: true })
  dataScadenza: Date | null;

  @Column("money", {
    name: "ImportoRata",
    nullable: true,
    default: () => "(0)",
  })
  importoRata: number | null;

  @Column("money", {
    name: "ImportoIncassato",
    nullable: true,
    default: () => "(0)",
  })
  importoIncassato: number | null;

  @Column("money", {
    name: "ImportoAbbuono",
    nullable: true,
    default: () => "(0)",
  })
  importoAbbuono: number | null;

  @Column("bit", { name: "IsAcconto", nullable: true, default: () => "(0)" })
  isAcconto: boolean | null;

  @Column("int", { name: "IDFatturaSaldo", nullable: true })
  idFatturaSaldo: number | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("nvarchar", { name: "Divisa", nullable: true, length: 4 })
  divisa: string | null;

  @Column("int", { name: "IDCont" })
  idCont: number;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  @Column("bit", { name: "ForzaChiusura", nullable: true })
  forzaChiusura: boolean | null;

  @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.cRates)
  @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  idAnagrafica: AAnagrafica;
}
