import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { CFattureFornitore } from "./CFattureFornitore";

@Index("IX_C-FATTURE-FORNITORE-RIGHE", ["idFattura", "nrRiga"], {})
@Index("PK_C-FATTURE-FORNITORE-RIGHE", ["id"], { unique: true })
@Entity("C-FATTURE-FORNITORE-RIGHE", { schema: "dbo" })
export class CFattureFornitoreRighe {
  @Column("int", { primary: true, name: "ID" })
  id: number;

  @Column("int", { name: "IDFattura", nullable: true })
  idFattura: number | null;

  @Column("int", { name: "NrRiga", nullable: true })
  nrRiga: number | null;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 100 })
  descrizione: string | null;

  @Column("money", { name: "Imponibile", nullable: true })
  imponibile: number | null;

  @Column("real", { name: "AliquotaIva", nullable: true, precision: 24 })
  aliquotaIva: number | null;

  @Column("nvarchar", { name: "CodEsenzione", nullable: true, length: 5 })
  codEsenzione: string | null;

  // @ManyToOne(
  //   () => CFattureFornitore,
  //   (cFattureFornitore) => cFattureFornitore.cFattureFornitoreRighes
  // )
  // @JoinColumn([{ name: "IDFattura", referencedColumnName: "id" }])
  // idFattura2: CFattureFornitore;
}
