import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { MCureTestata } from "./MCureTestata";

@Index("M-PRESCRIZIONI_PK", ["id"], { unique: true })
@Entity("M-PRESCRIZIONI", { schema: "dbo" })
export class MPrescrizioni {
  @Column("int", { primary: true, name: "ID" })
  id: number;

  @Column("int", { name: "IDLaboratorio" })
  idLaboratorio: number;

  @Column("int", { name: "IDAnagrafica" })
  idAnagrafica: number;

  @Column("smallint", { name: "Anno", nullable: true })
  anno: number | null;

  @Column("nvarchar", { name: "Codice", nullable: true, length: 10 })
  codice: string | null;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 100 })
  descrizione: string | null;

  @Column("date", { name: "DataPrevistaConsegna", nullable: true })
  dataPrevistaConsegna: Date | null;

  @Column("date", { name: "DataConsegna2", nullable: true })
  dataConsegna2: Date | null;

  @Column("date", { name: "DataRicezione2", nullable: true })
  dataRicezione2: Date | null;

  @Column("date", { name: "DataConsegna3", nullable: true })
  dataConsegna3: Date | null;

  @Column("date", { name: "DataRicezione3", nullable: true })
  dataRicezione3: Date | null;

  @Column("nvarchar", { name: "NumBolla", nullable: true, length: 10 })
  numBolla: string | null;

  @Column("datetime", { name: "DataBolla", nullable: true })
  dataBolla: Date | null;

  @Column("nvarchar", { name: "NumBollaPassaggio", nullable: true, length: 10 })
  numBollaPassaggio: string | null;

  @Column("datetime", { name: "DataBollaPassaggio", nullable: true })
  dataBollaPassaggio: Date | null;

  @Column("money", { name: "Importo", nullable: true })
  importo: number | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("bit", { name: "StatoRecord", default: () => "(0)" })
  statoRecord: boolean;

  @ManyToOne(() => MCureTestata, (mCureTestata) => mCureTestata.mPrescrizionis)
  @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  idTestata: MCureTestata;
}
