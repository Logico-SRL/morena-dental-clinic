import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { TabListini, TabPrestazioni } from ".";

@Index(
  "IX_TAB-LISTINIRIGHE",
  ["idListino", "idPrestazione", "idTipologia", "idDente"],
  {}
)
@Index("PK_TAB-LISTINIRIGHE", ["id"], { unique: true })
@Entity("TAB-LISTINI-RIGHE", { schema: "dbo" })
export class TabListiniRighe {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDListino", default: () => "(0)" })
  idListino: number;

  @Column("int", { name: "IDPrestazione", default: () => "(0)" })
  idPrestazione: number;

  @Column("int", { name: "IDTipologia", nullable: true, default: () => "(0)" })
  idTipologia: number | null;

  @Column("smallint", { name: "IDDente", nullable: true, default: () => "(0)" })
  idDente: number | null;

  @Column("datetime", { name: "DataValidità" })
  dataValidit: Date;

  @Column("money", { name: "Prezzo", nullable: true, default: () => "(0)" })
  prezzo: number | null;

  @Column("float", {
    name: "Sconto%",
    nullable: true,
    precision: 53,
    default: () => "(0)",
  })
  sconto: number | null;

  @Column("smallmoney", { name: "Iva%", nullable: true })
  iva: number | null;

  @Column("money", {
    name: "CostoLaboratorio",
    nullable: true,
    default: () => "(0)",
  })
  costoLaboratorio: number | null;

  @Column("nvarchar", { name: "Divisa", nullable: true, length: 4 })
  divisa: string | null;

  @Column("nvarchar", { name: "Descrizione2", nullable: true, length: 100 })
  descrizione2: string | null;

  @Column("nvarchar", { name: "Codice2", nullable: true, length: 10 })
  codice2: string | null;

  @ManyToOne(() => TabListini, (tabListini) => tabListini.tabListiniRighes)
  @JoinColumn([{ name: "IDListino", referencedColumnName: "id" }])
  idListino2: TabListini;

  @ManyToOne(
    () => TabPrestazioni,
    (tabPrestazioni) => tabPrestazioni.tabListiniRighes
  )
  @JoinColumn([{ name: "IDPrestazione", referencedColumnName: "id" }])
  idPrestazione2: TabPrestazioni;
}
