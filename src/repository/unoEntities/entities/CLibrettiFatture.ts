import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CFattureCliente } from "./CFattureCliente";

@Index("PK_C-NUMERATORI", ["id"], { unique: true })
@Entity("C-LIBRETTI-FATTURE", { schema: "dbo" })
export class CLibrettiFatture {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Descrizione", length: 20 })
  descrizione: string;

  @Column("int", { name: "NumeroDocumento", nullable: true })
  numeroDocumento: number | null;

  @Column("datetime", { name: "DataDocumento", nullable: true })
  dataDocumento: Date | null;

  @Column("int", { name: "IDSocietà" })
  idSociet: number;

  @Column("int", { name: "OrdineInterno", default: () => "(0)" })
  ordineInterno: number;

  @Column("int", { name: "IDNumeratore" })
  idNumeratore: number;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  @Column("bit", { name: "AutoFatture", default: () => "(0)" })
  autoFatture: boolean;

  @OneToMany(
    () => CFattureCliente,
    (cFattureCliente) => cFattureCliente.idLibretto2
  )
  cFattureClientes: CFattureCliente[];
}
