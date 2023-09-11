import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { MagAnagraficaAltrifor } from "./MagAnagraficaAltrifor";
import { MagMovimenti } from "./MagMovimenti";
import { MagOfferte } from "./MagOfferte";
import { MagOrdiniRighe } from "./MagOrdiniRighe";
import { MagSaldi } from "./MagSaldi";

@Index("IX_MAG-ANAGRAFICA", ["descrizione"], {})
@Index("PK_MAG-ANAGRAFICA", ["id"], { unique: true })
@Entity("MAG-ANAGRAFICA", { schema: "dbo" })
export class MagAnagrafica {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "CodFor", nullable: true, length: 20 })
  codFor: string | null;

  @Column("nvarchar", { name: "Descrizione", length: 100 })
  descrizione: string;

  @Column("smallint", { name: "IDFamiglia", nullable: true })
  idFamiglia: number | null;

  @Column("smallint", { name: "IDSottoFamiglia", nullable: true })
  idSottoFamiglia: number | null;

  @Column("smallint", { name: "IDGruppo", nullable: true })
  idGruppo: number | null;

  @Column("smallint", { name: "IDCategoria", nullable: true })
  idCategoria: number | null;

  @Column("nvarchar", { name: "UMc", nullable: true, length: 4 })
  uMc: string | null;

  @Column("nvarchar", { name: "UMs", nullable: true, length: 4 })
  uMs: string | null;

  @Column("smallint", { name: "Fc", nullable: true })
  fc: number | null;

  @Column("bit", { name: "Scadenza", default: () => "(0)" })
  scadenza: boolean;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("bit", { name: "MyDT", default: () => "(0)" })
  myDt: boolean;

  @Column("bit", { name: "StatoRecord", default: () => "(0)" })
  statoRecord: boolean;

  @Column("money", { name: "Prezzo", nullable: true })
  prezzo: number | null;

  @Column("nvarchar", { name: "CodProd", nullable: true, length: 50 })
  codProd: string | null;

  @Column("int", { name: "IDFornitore", nullable: true })
  idFornitore: number | null;

  @OneToMany(
    () => MagAnagraficaAltrifor,
    (magAnagraficaAltrifor) => magAnagraficaAltrifor.idArticolo2
  )
  magAnagraficaAltrifors: MagAnagraficaAltrifor[];

  // @OneToMany(() => MagInventario, (magInventario) => magInventario.idArticolo)
  // magInventarios: MagInventario[];

  @OneToMany(() => MagMovimenti, (magMovimenti) => magMovimenti.idArticolo2)
  magMovimentis: MagMovimenti[];

  @OneToMany(() => MagOfferte, (magOfferte) => magOfferte.idArticolo2)
  magOffertes: MagOfferte[];

  @OneToMany(
    () => MagOrdiniRighe,
    (magOrdiniRighe) => magOrdiniRighe.idArticolo2
  )
  magOrdiniRighes: MagOrdiniRighe[];

  @OneToMany(() => MagSaldi, (magSaldi) => magSaldi.idArticolo2)
  magSaldis: MagSaldi[];
}
