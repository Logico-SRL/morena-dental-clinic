import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { MagAnagrafica } from "./MagAnagrafica";

@Index("MAG-ANAGRAFICAMAG-SALDI", ["idArticolo"], {})
@Index("MAG-SALDI_PK", ["id"], { unique: true })
@Entity("MAG-SALDI", { schema: "dbo" })
export class MagSaldi {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDArticolo" })
  idArticolo: number;

  @Column("smallint", { name: "IDMagazzino" })
  idMagazzino: number;

  @Column("int", { name: "GiacenzaIni", nullable: true })
  giacenzaIni: number | null;

  @Column("int", { name: "TotCarico", nullable: true })
  totCarico: number | null;

  @Column("int", { name: "TotScarico", nullable: true })
  totScarico: number | null;

  @Column("int", { name: "TotOrdini", nullable: true })
  totOrdini: number | null;

  @Column("int", { name: "ScortaMinima", nullable: true })
  scortaMinima: number | null;

  @Column("datetime", { name: "DataUC", nullable: true })
  dataUc: Date | null;

  @Column("datetime", { name: "DataUS", nullable: true })
  dataUs: Date | null;

  @Column("datetime", { name: "DataNextScad", nullable: true })
  dataNextScad: Date | null;

  @Column("nvarchar", { name: "Ubicazione", nullable: true, length: 20 })
  ubicazione: string | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("money", { name: "PrezzoMedio", nullable: true })
  prezzoMedio: number | null;

  @Column("money", { name: "PrezzoMedioST", nullable: true })
  prezzoMedioSt: number | null;

  @Column("money", { name: "PrezzoUltimo", nullable: true })
  prezzoUltimo: number | null;

  @Column("bit", { name: "StatoRecord", default: () => "(0)" })
  statoRecord: boolean;

  @Column("int", { name: "Refill", default: () => "(0)" })
  refill: number;

  @ManyToOne(() => MagAnagrafica, (magAnagrafica) => magAnagrafica.magSaldis)
  @JoinColumn([{ name: "IDArticolo", referencedColumnName: "id" }])
  idArticolo2: MagAnagrafica;

  // @ManyToOne(() => TabSocieta, (tabSocieta) => tabSocieta.magSaldis)
  // @JoinColumn([{ name: "IDSocietà", referencedColumnName: "id" }])
  // idSociet: TabSocieta;
}
