import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CFattureFornitoreRighe } from "./CFattureFornitoreRighe";
import { CFattureStudisettore } from "./CFattureStudisettore";

@Index("PK_C-FATTURE-FORNITORE", ["id"], { unique: true })
@Entity("C-FATTURE-FORNITORE", { schema: "dbo" })
export class CFattureFornitore {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica" })
  idAnagrafica: number;

  @Column("nvarchar", { name: "NumeroDocumento", length: 20 })
  numeroDocumento: string;

  @Column("datetime", { name: "DataDocumento" })
  dataDocumento: Date;

  @Column("smallint", { name: "AnnoCompetenza" })
  annoCompetenza: number;

  @Column("nvarchar", { name: "TipoDocumento", length: 1 })
  tipoDocumento: string;

  @Column("money", { name: "Imponibile" })
  imponibile: number;

  @Column("money", { name: "ImportoEsente" })
  importoEsente: number;

  @Column("money", { name: "ImportoBollo" })
  importoBollo: number;

  @Column("money", { name: "ImportoIva" })
  importoIva: number;

  @Column("money", { name: "ImportoRA" })
  importoRa: number;

  @Column("money", { name: "AbbuonoFattura" })
  abbuonoFattura: number;

  @Column("int", { name: "IDSocietà" })
  idSociet: number;

  @Column("nvarchar", { name: "Divisa", length: 4 })
  divisa: string;

  @Column("int", { name: "IDPagamento" })
  idPagamento: number;

  @Column("smallint", { name: "Decorrenza" })
  decorrenza: number;

  @Column("ntext", { name: "Commento", nullable: true })
  commento: string | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  @Column("bit", { name: "CdC" })
  cdC: boolean;

  @Column("bit", { name: "SS" })
  ss: boolean;

  @Column("money", { name: "AbbuonoBollo", nullable: true })
  abbuonoBollo: number | null;

  @OneToMany(
    () => CFattureFornitoreRighe,
    (cFattureFornitoreRighe) => cFattureFornitoreRighe.idFattura2
  )
  cFattureFornitoreRighes: CFattureFornitoreRighe[];

  @OneToMany(
    () => CFattureStudisettore,
    (cFattureStudisettore) => cFattureStudisettore.idFattura2
  )
  cFattureStudisettores: CFattureStudisettore[];
}
