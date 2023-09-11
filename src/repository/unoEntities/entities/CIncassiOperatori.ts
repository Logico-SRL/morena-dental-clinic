import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { CFattureCliente } from "./CFattureCliente";

@Index("IX_C-INCASSI-OPERATORI", ["idOperatore", "idFattura"], {})
@Index("PK_C-INCASSI-OPERATORI", ["id"], { unique: true })
@Entity("C-INCASSI-OPERATORI", { schema: "dbo" })
export class CIncassiOperatori {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDFattura", default: () => "(0)" })
  idFattura: number;

  @Column("int", { name: "IDOperatore", default: () => "(0)" })
  idOperatore: number;

  @Column("money", { name: "Importo", nullable: true, default: () => "(0)" })
  importo: number | null;

  @Column("nvarchar", { name: "Commento", nullable: true, length: 150 })
  commento: string | null;

  @ManyToOne(
    () => CFattureCliente,
    (cFattureCliente) => cFattureCliente.cIncassiOperatoris
  )
  @JoinColumn([{ name: "IDFattura", referencedColumnName: "id" }])
  idFattura2: CFattureCliente;

  // @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.cIncassiOperatoris)
  // @JoinColumn([{ name: "IDOperatore", referencedColumnName: "id" }])
  // idOperatore2: AAnagrafica;
}
