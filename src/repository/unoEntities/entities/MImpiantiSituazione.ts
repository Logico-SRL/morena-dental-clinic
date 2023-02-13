import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MImpiantiAnnotazioni } from "./MImpiantiAnnotazioni";
import { MImpiantiTestata } from "./MImpiantiTestata";
import { TabImpianti } from "./TabImpianti";

@Index("M-IMPIANTI-SITUAZIONE_PK", ["id"], { unique: true })
@Index(
  "SituazioneImpiantiCartella",
  ["idTestata", "idDente", "idImpianto", "idInterno"],
  {}
)
@Entity("M-IMPIANTI-SITUAZIONE", { schema: "dbo" })
export class MImpiantiSituazione {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTestata", default: () => "(0)" })
  idTestata: number;

  @Column("smallint", { name: "IDDente", default: () => "(0)" })
  idDente: number;

  @Column("int", { name: "IDImpianto", default: () => "(0)" })
  idImpianto: number;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  @Column("datetime", { name: "Data1FaseChir", nullable: true })
  data1FaseChir: Date | null;

  @Column("datetime", { name: "Data2FaseChir", nullable: true })
  data2FaseChir: Date | null;

  @Column("datetime", { name: "DataCaricoP", nullable: true })
  dataCaricoP: Date | null;

  @Column("datetime", { name: "DataRimozione", nullable: true })
  dataRimozione: Date | null;

  @Column("datetime", { name: "DataAggiornamento", nullable: true })
  dataAggiornamento: Date | null;

  @Column("datetime", { name: "DataInserimento", nullable: true })
  dataInserimento: Date | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  @Column("smallint", { name: "IdInterno", default: () => "(0)" })
  idInterno: number;

  // @OneToMany(
  //   () => MImpiantiAnnotazioni,
  //   (mImpiantiAnnotazioni) => mImpiantiAnnotazioni.idSituazione2
  // )
  // mImpiantiAnnotazionis: MImpiantiAnnotazioni[];

  // @ManyToOne(
  //   () => MImpiantiTestata,
  //   (mImpiantiTestata) => mImpiantiTestata.mImpiantiSituaziones,
  //   { onDelete: "CASCADE", onUpdate: "CASCADE" }
  // )
  // @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  // idTestata2: MImpiantiTestata;

  // @ManyToOne(
  //   () => TabImpianti,
  //   (tabImpianti) => tabImpianti.mImpiantiSituaziones,
  //   { onUpdate: "CASCADE" }
  // )
  // @JoinColumn([{ name: "IDImpianto", referencedColumnName: "id" }])
  // idImpianto2: TabImpianti;
}
