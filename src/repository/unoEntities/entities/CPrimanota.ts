import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CScadenzario } from "./CScadenzario";

@Index(
  "IX_C-PRIMANOTA",
  ["dataRegistrazione", "numeroRegistrazione", "registroIva", "nrRiga"],
  {}
)
@Index("IX_C-PRIMANOTA_1", ["idRiferimento"], {})
@Index(
  "IX_C-PRIMANOTA_2",
  [
    "mastro",
    "conto",
    "sottoConto",
    "dataRegistrazione",
    "numeroRegistrazione",
    "segno",
    "idSociet",
    "registroIva",
  ],
  { unique: true }
)
@Index("PK_C-PRIMANOTA", ["id"], { unique: true })
@Entity("C-PRIMANOTA", { schema: "dbo" })
export class CPrimanota {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDSocietà", default: () => "(0)" })
  idSociet: number;

  @Column("datetime", { name: "DataRegistrazione" })
  dataRegistrazione: Date;

  @Column("nvarchar", {
    name: "NumeroRegistrazione",
    nullable: true,
    length: 30,
  })
  numeroRegistrazione: string | null;

  @Column("datetime", { name: "DataDocumento", nullable: true })
  dataDocumento: Date | null;

  @Column("nvarchar", { name: "NumeroDocumento", nullable: true, length: 30 })
  numeroDocumento: string | null;

  @Column("nvarchar", { name: "TipoDocumento", nullable: true, length: 1 })
  tipoDocumento: string | null;

  @Column("int", { name: "RegistroIva" })
  registroIva: number;

  @Column("int", { name: "NrRiga" })
  nrRiga: number;

  @Column("nvarchar", { name: "Segno", length: 1 })
  segno: string;

  @Column("money", { name: "Importo", default: () => "(0)" })
  importo: number;

  @Column("int", { name: "Mastro" })
  mastro: number;

  @Column("int", { name: "Conto" })
  conto: number;

  @Column("int", { name: "SottoConto" })
  sottoConto: number;

  @Column("int", { name: "IDCausale", nullable: true })
  idCausale: number | null;

  @Column("nvarchar", { name: "DesCausale", nullable: true, length: 20 })
  desCausale: string | null;

  @Column("nvarchar", { name: "Descrizione", length: 100 })
  descrizione: string;

  @Column("nvarchar", { name: "Divisa", length: 4 })
  divisa: string;

  @Column("smallint", { name: "Ord", nullable: true })
  ord: number | null;

  @Column("int", { name: "IDRiferimento", nullable: true })
  idRiferimento: number | null;

  @Column("int", { name: "IDRiferimentoPN", nullable: true })
  idRiferimentoPn: number | null;

  @Column("bit", { name: "StatoRecord", default: () => "(-1)" })
  statoRecord: boolean;

  @Column("smallint", { name: "IDr1", nullable: true })
  iDr1: number | null;

  @Column("smallint", { name: "IDr2", nullable: true })
  iDr2: number | null;

  @OneToMany(() => CScadenzario, (cScadenzario) => cScadenzario.idPrimaNota)
  cScadenzarios: CScadenzario[];
}
