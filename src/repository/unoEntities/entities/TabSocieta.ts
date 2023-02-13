import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MagInventario } from "./MagInventario";
import { MagMovimenti } from "./MagMovimenti";
import { MagOrdini } from "./MagOrdini";
import { MagSaldi } from "./MagSaldi";
import { TabSicurezzaGruppi } from "./TabSicurezzaGruppi";
import { AAnagrafica } from "./AAnagrafica";

@Index("PK_TAB-SOCIETA", ["id"], { unique: true })
@Entity("TAB-SOCIETA", { schema: "dbo" })
export class TabSocieta {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Descrizione", length: 70 })
  descrizione: string;

  @Column("nvarchar", { name: "DeSocietà1", nullable: true, length: 50 })
  deSociet_1: string | null;

  @Column("nvarchar", { name: "DeSocietà2", nullable: true, length: 50 })
  deSociet_2: string | null;

  @Column("nvarchar", { name: "DeSocietà3", nullable: true, length: 50 })
  deSociet_3: string | null;

  @Column("nvarchar", { name: "DeSocietà4", nullable: true, length: 50 })
  deSociet_4: string | null;

  @Column("nvarchar", { name: "DeSocietà5", nullable: true, length: 50 })
  deSociet_5: string | null;

  @Column("int", { name: "OrdineInterno", default: () => "(1)" })
  ordineInterno: number;

  @Column("bit", { name: "Supervisione", nullable: true })
  supervisione: boolean | null;

  @Column("nvarchar", { name: "FeCodDestinatario", nullable: true, length: 7 })
  feCodDestinatario: string | null;

  @Column("nvarchar", { name: "FeRegimeFiscale", nullable: true, length: 4 })
  feRegimeFiscale: string | null;

  @Column("nvarchar", { name: "FeUser", nullable: true, length: 50 })
  feUser: string | null;

  @Column("nvarchar", { name: "FePwd", nullable: true, length: 20 })
  fePwd: string | null;

  @Column("nvarchar", { name: "FeEsigIva", nullable: true, length: 1 })
  feEsigIva: string | null;

  // @OneToMany(() => MagInventario, (magInventario) => magInventario.idSociet)
  // magInventarios: MagInventario[];

  // @OneToMany(() => MagMovimenti, (magMovimenti) => magMovimenti.idSociet)
  // magMovimentis: MagMovimenti[];

  // @OneToMany(() => MagOrdini, (magOrdini) => magOrdini.idSociet)
  // magOrdinis: MagOrdini[];

  // @OneToMany(() => MagSaldi, (magSaldi) => magSaldi.idSociet)
  // magSaldis: MagSaldi[];

  // @OneToMany(
  //   () => TabSicurezzaGruppi,
  //   (tabSicurezzaGruppi) => tabSicurezzaGruppi.idSociet
  // )
  // tabSicurezzaGruppis: TabSicurezzaGruppi[];

  // @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.tabSocietas)
  // @JoinColumn([{ name: "IdSedeOperativa", referencedColumnName: "id" }])
  // idSedeOperativa: AAnagrafica;

  // @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.tabSocietas2)
  // @JoinColumn([{ name: "IdSedeLegale", referencedColumnName: "id" }])
  // idSedeLegale: AAnagrafica;
}
