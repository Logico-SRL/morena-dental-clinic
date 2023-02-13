import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MImpiantiSituazione } from "./MImpiantiSituazione";

@Index("IdInterno", ["tipo", "idInterno"], {})
@Index("TAB-IMPIANTI_PK", ["id"], { unique: true })
@Entity("TAB-IMPIANTI", { schema: "dbo" })
export class TabImpianti {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Tipo", default: () => "(0)" })
  tipo: number;

  @Column("smallint", { name: "IdInterno", default: () => "(0)" })
  idInterno: number;

  @Column("nvarchar", { name: "Marca", nullable: true, length: 25 })
  marca: string | null;

  @Column("nvarchar", { name: "Modello", nullable: true, length: 25 })
  modello: string | null;

  @Column("real", {
    name: "Diametro",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  diametro: number | null;

  @Column("real", {
    name: "Lunghezza",
    nullable: true,
    precision: 24,
    default: () => "(0)",
  })
  lunghezza: number | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  // @OneToMany(
  //   () => MImpiantiSituazione,
  //   (mImpiantiSituazione) => mImpiantiSituazione.idImpianto2
  // )
  // mImpiantiSituaziones: MImpiantiSituazione[];
}
