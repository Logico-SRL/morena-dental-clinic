import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MagOrdini } from "./MagOrdini";
import { MagAnagrafica } from "./MagAnagrafica";

@Index("IX_MAG-ORDINI-R", ["idOrdine", "idArticolo"], {})
@Index("PK_MAG-ORDINI-R", ["id"], { unique: true })
@Entity("MAG-ORDINI-RIGHE", { schema: "dbo" })
export class MagOrdiniRighe {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDOrdine" })
  idOrdine: number;

  @Column("smallint", { name: "NrRiga" })
  nrRiga: number;

  @Column("int", { name: "IDArticolo" })
  idArticolo: number;

  @Column("smallint", { name: "Qta", nullable: true })
  qta: number | null;

  @Column("money", { name: "Prezzo", nullable: true })
  prezzo: number | null;

  @Column("float", { name: "Sconto%", nullable: true, precision: 53 })
  sconto: number | null;

  @Column("float", { name: "Iva%", nullable: true, precision: 53 })
  iva: number | null;

  @Column("smallint", { name: "QtaEvasa", nullable: true })
  qtaEvasa: number | null;

  @Column("datetime", { name: "DataRicevimento", nullable: true })
  dataRicevimento: Date | null;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 50 })
  descrizione: string | null;

  @Column("bit", { name: "StatoRecord", default: () => "(0)" })
  statoRecord: boolean;

  @ManyToOne(() => MagOrdini, (magOrdini) => magOrdini.magOrdiniRighes)
  @JoinColumn([{ name: "IDOrdine", referencedColumnName: "id" }])
  idOrdine2: MagOrdini;

  @ManyToOne(
    () => MagAnagrafica,
    (magAnagrafica) => magAnagrafica.magOrdiniRighes
  )
  @JoinColumn([{ name: "IDArticolo", referencedColumnName: "id" }])
  idArticolo2: MagAnagrafica;
}
