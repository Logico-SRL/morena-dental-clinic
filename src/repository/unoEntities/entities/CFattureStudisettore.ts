import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CFattureFornitore } from "./CFattureFornitore";

@Index(
  "IX_C-FATTURE-STUDISETTORE",
  ["idFattura", "tipoAnalisi", "idssCod", "annoRiferimento"],
  {}
)
@Index("PK_C-FATTURE-STUDISETTORE", ["id"], { unique: true })
@Entity("C-FATTURE-STUDISETTORE", { schema: "dbo" })
export class CFattureStudisettore {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IdFattura", default: () => "(0)" })
  idFattura: number;

  @Column("smallint", { name: "TipoAnalisi", default: () => "(0)" })
  tipoAnalisi: number;

  @Column("int", { name: "IDSSCod" })
  idssCod: number;

  @Column("smallint", { name: "AnnoRiferimento", default: () => "(0)" })
  annoRiferimento: number;

  @Column("money", { name: "Importo", nullable: true, default: () => "(0)" })
  importo: number | null;

  // @ManyToOne(
  //   () => CFattureFornitore,
  //   (cFattureFornitore) => cFattureFornitore.cFattureStudisettores
  // )
  // @JoinColumn([{ name: "IdFattura", referencedColumnName: "id" }])
  // idFattura2: CFattureFornitore;
}
