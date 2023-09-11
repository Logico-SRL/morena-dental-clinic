import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CPrimanota } from "./CPrimanota";

@Index("PK_C-SCADENZARIO", ["id"], { unique: true })
@Entity("C-SCADENZARIO", { schema: "dbo" })
export class CScadenzario {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica", nullable: true, default: () => "(0)" })
  idAnagrafica: number | null;

  @Column("datetime", { name: "DataDocumento", nullable: true })
  dataDocumento: Date | null;

  @Column("nvarchar", { name: "NumeroDocumento", nullable: true, length: 30 })
  numeroDocumento: string | null;

  @Column("datetime", { name: "DataScadenza" })
  dataScadenza: Date;

  @Column("money", { name: "Importo", default: () => "(0)" })
  importo: number;

  @Column("money", { name: "Saldo", default: () => "(0)" })
  saldo: number;

  @Column("nvarchar", { name: "Divisa", nullable: true, length: 4 })
  divisa: string | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("nvarchar", { name: "Segno", nullable: true, length: 1 })
  segno: string | null;

  @Column("int", { name: "IDSocietà", default: () => "(0)" })
  idSociet: number;

  @Column("int", { name: "IDRiferimentoFattura", nullable: true })
  idRiferimentoFattura: number | null;

  @ManyToOne(() => CPrimanota, (cPrimanota) => cPrimanota.cScadenzarios)
  @JoinColumn([{ name: "IDPrimaNota", referencedColumnName: "id" }])
  idPrimaNota: CPrimanota;
}
