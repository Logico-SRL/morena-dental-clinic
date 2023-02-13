import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AAnagraficaIndirizzi } from "./AAnagraficaIndirizzi";

@Index("IX_TAB-COMUNI", ["descrizione", "provincia", "regione", "nazione"], {
  unique: true,
})
@Index("PK_TAB-COMUNI", ["id"], { unique: true })
@Entity("TAB-COMUNI", { schema: "dbo" })
export class TabComuni {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nchar", { name: "Descrizione", length: 40 })
  descrizione: string;

  @Column("nvarchar", { name: "Provincia", nullable: true, length: 2 })
  provincia: string | null;

  @Column("nvarchar", { name: "Regione", nullable: true, length: 3 })
  regione: string | null;

  @Column("nvarchar", { name: "CAP", nullable: true, length: 5 })
  cap: string | null;

  @Column("nvarchar", { name: "Prefisso", nullable: true, length: 4 })
  prefisso: string | null;

  @Column("nvarchar", { name: "CodiceComune", nullable: true, length: 4 })
  codiceComune: string | null;

  @Column("nvarchar", { name: "CodiceISTAT", nullable: true, length: 6 })
  codiceIstat: string | null;

  @Column("nvarchar", { name: "Nazione", nullable: true, length: 3 })
  nazione: string | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  // @OneToMany(
  //   () => AAnagraficaIndirizzi,
  //   (aAnagraficaIndirizzi) => aAnagraficaIndirizzi.idComune
  // )
  // aAnagraficaIndirizzis: AAnagraficaIndirizzi[];
}
