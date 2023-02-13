import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MCurePiano } from "./MCurePiano";
import { MCureTestata } from "./MCureTestata";
import { TabPrestazioni } from "./TabPrestazioni";
import { MCureRigheDenti } from "./MCureRigheDenti";
import { MCureRigheNotecliniche } from "./MCureRigheNotecliniche";

@Index("IX_C-CURE-RIGHE", ["idTestata"], {})
@Index("PK_M-CURE-RIGHE", ["id"], { unique: true })
@Entity("M-CURE-RIGHE", { schema: "dbo" })
export class MCureRighe {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTestata", default: () => "(0)" })
  idTestata: number;

  @Column("smallint", { name: "NrRiga", default: () => "(0)" })
  nrRiga: number;

  @Column("nvarchar", { name: "DePrestazione", nullable: true, length: 100 })
  dePrestazione: string | null;

  @Column("int", { name: "IDTipologia", nullable: true })
  idTipologia: number | null;

  @Column("smallint", { name: "Durata", nullable: true, default: () => "(0)" })
  durata: number | null;

  @Column("int", { name: "IDOperatore", nullable: true })
  idOperatore: number | null;

  @Column("datetime", { name: "DataEsecuzione", nullable: true })
  dataEsecuzione: Date | null;

  @Column("money", { name: "Prezzo", nullable: true, default: () => "(0)" })
  prezzo: number | null;

  @Column("money", { name: "Sconto", nullable: true, default: () => "(0)" })
  sconto: number | null;

  @Column("smallint", { name: "Numero", nullable: true, default: () => "(0)" })
  numero: number | null;

  @Column("money", { name: "Importo", nullable: true, default: () => "(0)" })
  importo: number | null;

  @Column("bit", { name: "FlIncorso", default: () => "(0)" })
  flIncorso: boolean;

  @Column("bit", { name: "RigaFatturata", default: () => "(0)" })
  rigaFatturata: boolean;

  @Column("int", { name: "IDRicevutaSaldo", nullable: true })
  idRicevutaSaldo: number | null;

  @Column("money", {
    name: "CostiAggiuntivi",
    nullable: true,
    default: () => "(0)",
  })
  costiAggiuntivi: number | null;

  @Column("money", { name: "Aggiunta", nullable: true, default: () => "(0)" })
  aggiunta: number | null;

  @Column("nvarchar", { name: "ListaElementi", nullable: true, length: 47 })
  listaElementi: string | null;

  @Column("int", { name: "IDCartellaSpec", nullable: true })
  idCartellaSpec: number | null;

  @Column("bit", { name: "StatoRecord", default: () => "(1)" })
  statoRecord: boolean;

  @Column("money", {
    name: "ImportoEnte",
    nullable: true,
    default: () => "(0)",
  })
  importoEnte: number | null;

  @Column("nvarchar", { name: "DescrizioneEnte", nullable: true, length: 100 })
  descrizioneEnte: string | null;

  @Column("bit", { name: "ForzaChiusura", nullable: true })
  forzaChiusura: boolean | null;

  @Column("smallmoney", { name: "AliquotaIva", nullable: true })
  aliquotaIva: number | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;

  @Column("bit", { name: "Rifacimento", nullable: true })
  rifacimento: boolean | null;

  // @OneToMany(() => MCurePiano, (mCurePiano) => mCurePiano.idCureRighe)
  // mCurePianos: MCurePiano[];

  // @ManyToOne(() => MCureTestata, (mCureTestata) => mCureTestata.mCureRighes)
  // @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  // idTestata2: MCureTestata;

  // @ManyToOne(
  //   () => TabPrestazioni,
  //   (tabPrestazioni) => tabPrestazioni.mCureRighes
  // )
  // @JoinColumn([{ name: "IDPrestazione", referencedColumnName: "id" }])
  // idPrestazione: TabPrestazioni;

  // @OneToMany(
  //   () => MCureRigheDenti,
  //   (mCureRigheDenti) => mCureRigheDenti.idCureRighe2
  // )
  // mCureRigheDentis: MCureRigheDenti[];

  // @OneToMany(
  //   () => MCureRigheNotecliniche,
  //   (mCureRigheNotecliniche) => mCureRigheNotecliniche.idCureRighe2
  // )
  // mCureRigheNotecliniches: MCureRigheNotecliniche[];
}
