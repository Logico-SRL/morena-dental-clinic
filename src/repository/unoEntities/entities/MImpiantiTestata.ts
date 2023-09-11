import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AAnagrafica, MImpiantiFasi, MImpiantiSituazione } from ".";

@Index("M-IMPIANTI-TESTATA_PK", ["id"], { unique: true })
@Index("Paziente", ["idAnagrafica", "idInterno"], {})
@Entity("M-IMPIANTI-TESTATA", { schema: "dbo" })
export class MImpiantiTestata {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "IdInterno", default: () => "(0)" })
  idInterno: number;

  @Column("int", { name: "IDAnagrafica", default: () => "(0)" })
  idAnagrafica: number;

  @Column("int", { name: "IDOperatore", default: () => "(0)" })
  idOperatore: number;

  @Column("int", { name: "IdSoluzione", default: () => "(0)" })
  idSoluzione: number;

  @Column("datetime", { name: "DataRilevazioni", nullable: true })
  dataRilevazioni: Date | null;

  @Column("bit", { name: "Attenzione", nullable: true, default: () => "(0)" })
  attenzione: boolean | null;

  @Column("datetime", { name: "DataAggiornamento", nullable: true })
  dataAggiornamento: Date | null;

  @Column("datetime", { name: "DataInserimento", nullable: true })
  dataInserimento: Date | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  @OneToMany(() => MImpiantiFasi, (mImpiantiFasi) => mImpiantiFasi.idTestata2)
  mImpiantiFasis: MImpiantiFasi[];

  @OneToMany(
    () => MImpiantiSituazione,
    (mImpiantiSituazione) => mImpiantiSituazione.idTestata2
  )
  mImpiantiSituaziones: MImpiantiSituazione[];

  @ManyToOne(
    () => AAnagrafica,
    (aAnagrafica) => aAnagrafica.mImpiantiTestatas,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  idAnagrafica2: AAnagrafica;
}
