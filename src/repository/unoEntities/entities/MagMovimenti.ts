import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { MagAnagrafica } from "./MagAnagrafica";

@Index("IX_MAG-MOVIMENTI", ["idMagazzino", "idArticolo"], {})
@Index("PK_MAG-MOVIMENTI", ["id"], { unique: true })
@Entity("MAG-MOVIMENTI", { schema: "dbo" })
export class MagMovimenti {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDMagazzino" })
  idMagazzino: number;

  @Column("int", { name: "IDArticolo" })
  idArticolo: number;

  @Column("smallint", { name: "IDReparto", nullable: true })
  idReparto: number | null;

  @Column("nvarchar", { name: "Tipo", nullable: true, length: 1 })
  tipo: string | null;

  @Column("int", { name: "Qta", nullable: true })
  qta: number | null;

  @Column("nvarchar", { name: "UMc", nullable: true, length: 4 })
  uMc: string | null;

  @Column("nvarchar", { name: "UMs", nullable: true, length: 4 })
  uMs: string | null;

  @Column("smallint", { name: "Fc", nullable: true })
  fc: number | null;

  @Column("datetime", { name: "DataMovimento", nullable: true })
  dataMovimento: Date | null;

  @Column("datetime", { name: "DataScadenza", nullable: true })
  dataScadenza: Date | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("int", { name: "IDRigaOrdine", nullable: true })
  idRigaOrdine: number | null;

  @Column("money", { name: "Importo", nullable: true })
  importo: number | null;

  @Column("nvarchar", { name: "Lotto", nullable: true, length: 30 })
  lotto: string | null;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 50 })
  descrizione: string | null;

  @Column("bit", { name: "StatoRecord", default: () => "(0)" })
  statoRecord: boolean;

  @Column("nvarchar", { name: "NumDDT", nullable: true, length: 20 })
  numDdt: string | null;

  @Column("datetime", { name: "DataDDT", nullable: true })
  dataDdt: Date | null;

  @Column("bit", { name: "NoInventario", default: () => "(0)" })
  noInventario: boolean;

  // @ManyToOne(() => TabSocieta, (tabSocieta) => tabSocieta.magMovimentis)
  // @JoinColumn([{ name: "IDSocietà", referencedColumnName: "id" }])
  // idSociet: TabSocieta;

  @ManyToOne(
    () => MagAnagrafica,
    (magAnagrafica) => magAnagrafica.magMovimentis
  )
  @JoinColumn([{ name: "IDArticolo", referencedColumnName: "id" }])
  idArticolo2: MagAnagrafica;
}
