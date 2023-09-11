import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CFattureCliente } from "./CFattureCliente";

@Index("IX_C-FATTURE-RIGHE", ["idFattura", "nrRiga"], {})
@Index("PK_C-FATTURE-RIGHE", ["id"], { unique: true })
@Entity("C-FATTURE-CLIENTE-RIGHE", { schema: "dbo" })
export class CFattureClienteRighe {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDFattura", nullable: true })
  idFattura: number | null;

  @Column("int", { name: "NrRiga", nullable: true })
  nrRiga: number | null;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 100 })
  descrizione: string | null;

  @Column("money", { name: "Prezzo", nullable: true })
  prezzo: number | null;

  @Column("money", { name: "ScontoVal", nullable: true })
  scontoVal: number | null;

  @Column("money", { name: "Imponibile", nullable: true })
  imponibile: number | null;

  @Column("smallmoney", { name: "AliquotaIVA", nullable: true })
  aliquotaIva: number | null;

  @Column("nvarchar", { name: "CodEsenzione", nullable: true, length: 5 })
  codEsenzione: string | null;

  @Column("int", { name: "Gruppo", nullable: true })
  gruppo: number | null;

  @Column("decimal", {
    name: "Sconto%",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  sconto: number | null;

  @Column("bit", { name: "FlagNoRA", nullable: true })
  flagNoRa: boolean | null;

  @Column("money", { name: "ImportoEnte", nullable: true })
  importoEnte: number | null;

  @Column("nvarchar", { name: "FeNatura", nullable: true, length: 4 })
  feNatura: string | null;

  @Column("nvarchar", { name: "FeRifNorma", nullable: true, length: 100 })
  feRifNorma: string | null;

  @Column("nvarchar", { name: "TipoSpesaTS", nullable: true, length: 2 })
  tipoSpesaTs: string | null;

  @ManyToOne(
    () => CFattureCliente,
    (cFattureCliente) => cFattureCliente.cFattureClienteRighes
  )
  @JoinColumn([{ name: "IDFattura", referencedColumnName: "id" }])
  idFattura2: CFattureCliente;
}
