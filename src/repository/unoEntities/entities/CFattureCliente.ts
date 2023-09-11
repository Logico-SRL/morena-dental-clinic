import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CLibrettiFatture } from "./CLibrettiFatture";
import { CFattureClienteRighe } from "./CFattureClienteRighe";
import { CIncassiOperatori } from "./CIncassiOperatori";

@Index(
  "IX_C-FATTURE",
  ["idAnagrafica", "idCont", "idLibretto", "dataDocumento", "numeroDocumento"],
  {}
)
@Index("PK_C-FATTURE", ["id"], { unique: true })
@Entity("C-FATTURE-CLIENTE", { schema: "dbo" })
export class CFattureCliente {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica" })
  idAnagrafica: number;

  @Column("int", { name: "IDLibretto" })
  idLibretto: number;

  @Column("int", { name: "NumeroDocumento", default: () => "(0)" })
  numeroDocumento: number;

  @Column("datetime", { name: "DataDocumento" })
  dataDocumento: Date;

  @Column("smallint", { name: "AnnoCompetenza" })
  annoCompetenza: number;

  @Column("nvarchar", { name: "TipoDocumento", length: 1 })
  tipoDocumento: string;

  @Column("money", { name: "Imponibile", default: () => "(0)" })
  imponibile: number;

  @Column("money", { name: "ImportoEsente" })
  importoEsente: number;

  @Column("money", { name: "ImportoBollo", default: () => "(0)" })
  importoBollo: number;

  @Column("bit", { name: "StampaEnte", default: () => "(0)" })
  stampaEnte: boolean;

  @Column("money", { name: "QuotaEnte" })
  quotaEnte: number;

  @Column("float", { name: "Iva", precision: 53 })
  iva: number;

  @Column("money", { name: "ImportoIva" })
  importoIva: number;

  @Column("float", { name: "RA", precision: 53 })
  ra: number;

  @Column("money", { name: "ImportoRA" })
  importoRa: number;

  @Column("money", { name: "AbbuonoPreventivo", default: () => "(0)" })
  abbuonoPreventivo: number;

  @Column("money", { name: "AbbuonoFattura" })
  abbuonoFattura: number;

  @Column("int", { name: "IDSocietà" })
  idSociet: number;

  @Column("nvarchar", { name: "Divisa", length: 4 })
  divisa: string;

  @Column("smallint", { name: "Decorrenza", default: () => "(0)" })
  decorrenza: number;

  @Column("int", { name: "IDPagamento", nullable: true })
  idPagamento: number | null;

  @Column("int", { name: "IDCont", nullable: true })
  idCont: number | null;

  @Column("int", {
    name: "IDFatturaRiferimento",
    nullable: true,
    default: () => "(0)",
  })
  idFatturaRiferimento: number | null;

  @Column("ntext", { name: "Commento", nullable: true })
  commento: string | null;

  @Column("int", { name: "IDTutore", nullable: true })
  idTutore: number | null;

  @Column("bit", { name: "IsAssegnata", default: () => "(0)" })
  isAssegnata: boolean;

  @Column("bit", { name: "StatoRecord", default: () => "(1)" })
  statoRecord: boolean;

  @Column("money", { name: "AbbuonoBollo", nullable: true })
  abbuonoBollo: number | null;

  @Column("bit", { name: "ForzaChiusura", nullable: true })
  forzaChiusura: boolean | null;

  @Column("bit", { name: "PrintAnno", nullable: true })
  printAnno: boolean | null;

  @Column("nvarchar", { name: "PrintLibretto", nullable: true, length: 20 })
  printLibretto: string | null;

  @Column("bit", { name: "DettaglioPrezzi", nullable: true })
  dettaglioPrezzi: boolean | null;

  @Column("bit", { name: "DettaglioSconti", nullable: true })
  dettaglioSconti: boolean | null;

  @Column("bit", { name: "PrintDoc", nullable: true })
  printDoc: boolean | null;

  @Column("bit", { name: "InviataTS", nullable: true })
  inviataTs: boolean | null;

  @Column("datetime", { name: "DataTS", nullable: true })
  dataTs: Date | null;

  @Column("nvarchar", { name: "ProtocolloTS", nullable: true, length: 50 })
  protocolloTs: string | null;

  @Column("nvarchar", { name: "EsitoTS", nullable: true, length: 3 })
  esitoTs: string | null;

  @Column("nvarchar", { name: "TipoSpesaTS", nullable: true, length: 10 })
  tipoSpesaTs: string | null;

  @Column("nvarchar", { name: "RifNCnumeroTS", nullable: true, length: 50 })
  rifNCnumeroTs: string | null;

  @Column("nvarchar", { name: "RifNCdataTS", nullable: true, length: 10 })
  rifNCdataTs: string | null;

  @Column("bit", { name: "RifiutaTS", nullable: true })
  rifiutaTs: boolean | null;

  @Column("nvarchar", { name: "DataPagamentoTS", nullable: true, length: 10 })
  dataPagamentoTs: string | null;

  @Column("uniqueidentifier", { name: "FeId", nullable: true })
  feId: string | null;

  @Column("nvarchar", { name: "FeNome", nullable: true, length: 36 })
  feNome: string | null;

  @Column("smallint", { name: "FeStateCode", nullable: true })
  feStateCode: number | null;

  @Column("nvarchar", { name: "FeStateDes", nullable: true, length: 60 })
  feStateDes: string | null;

  @Column("nvarchar", { name: "FeNatura", nullable: true, length: 4 })
  feNatura: string | null;

  @Column("nvarchar", { name: "FeRifNorma", nullable: true, length: 100 })
  feRifNorma: string | null;

  @Column("nvarchar", { name: "FePagamento", nullable: true, length: 4 })
  fePagamento: string | null;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;

  @Column("bit", { name: "PagamentoTracciabile", nullable: true })
  pagamentoTracciabile: boolean | null;

  @Column("nvarchar", { name: "FeTipoDocumento", nullable: true, length: 4 })
  feTipoDocumento: string | null;

  @Column("bit", { name: "AutoFattura", default: () => "(0)" })
  autoFattura: boolean;

  @Column("nvarchar", { name: "RifFatturaFNumero", nullable: true, length: 30 })
  rifFatturaFNumero: string | null;

  @Column("datetime", { name: "RifFatturaFData", nullable: true })
  rifFatturaFData: Date | null;

  @ManyToOne(
    () => CLibrettiFatture,
    (cLibrettiFatture) => cLibrettiFatture.cFattureClientes
  )
  @JoinColumn([{ name: "IDLibretto", referencedColumnName: "id" }])
  idLibretto2: CLibrettiFatture;

  @OneToMany(
    () => CFattureClienteRighe,
    (cFattureClienteRighe) => cFattureClienteRighe.idFattura2
  )
  cFattureClienteRighes: CFattureClienteRighe[];

  @OneToMany(
    () => CIncassiOperatori,
    (cIncassiOperatori) => cIncassiOperatori.idFattura2
  )
  cIncassiOperatoris: CIncassiOperatori[];
}
