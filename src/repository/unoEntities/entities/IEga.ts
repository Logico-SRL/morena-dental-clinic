import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AAnagrafica } from "./AAnagrafica";
import { ILaymodNome } from "./ILaymodNome";
import { IEgaimgInforendering } from "./IEgaimgInforendering";

@Index("IX_I-EGA", ["idPaziente", "ordinamento", "infoClsDataRif"], {})
@Index("PK_I-EGA", ["id"], { unique: true })
@Entity("I-EGA", { schema: "dbo" })
export class IEga {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "TipoRecord" })
  tipoRecord: number;

  @Column("int", { name: "IDPaziente", default: () => "(0)" })
  idPaziente: number;

  @Column("int", {
    name: "SorgenteDatiId",
    nullable: true,
    default: () => "(0)",
  })
  sorgenteDatiId: number | null;

  @Column("int", { name: "IDProgetto", nullable: true })
  idProgetto: number | null;

  @Column("nvarchar", { name: "LinkedDataGUID", nullable: true, length: 50 })
  linkedDataGuid: string | null;

  @Column("nvarchar", { name: "InfoClsTitolo", nullable: true, length: 50 })
  infoClsTitolo: string | null;

  @Column("datetime", { name: "InfoClsDataRif", nullable: true })
  infoClsDataRif: Date | null;

  @Column("ntext", { name: "InfoClsNote", nullable: true })
  infoClsNote: string | null;

  @Column("nvarchar", {
    name: "InfoClsDenteArcata",
    nullable: true,
    length: 29,
    default: () => "'0000'",
  })
  infoClsDenteArcata: string | null;

  @Column("int", { name: "GruppoID", nullable: true, default: () => "(0)" })
  gruppoId: number | null;

  @Column("int", { name: "GruppoPos", nullable: true, default: () => "(0)" })
  gruppoPos: number | null;

  @Column("int", { name: "Ordinamento", nullable: true })
  ordinamento: number | null;

  @Column("nvarchar", {
    name: "InfoClsDescrizione",
    nullable: true,
    length: 50,
  })
  infoClsDescrizione: string | null;

  @Column("nvarchar", { name: "InfoClsDiagnosi", nullable: true, length: 50 })
  infoClsDiagnosi: string | null;

  @Column("nvarchar", { name: "InfoClsTerapia", nullable: true, length: 50 })
  infoClsTerapia: string | null;

  @Column("smallint", { name: "InfoClsCategoria", nullable: true })
  infoClsCategoria: number | null;

  @Column("datetime", { name: "DataAggiornamento", nullable: true })
  dataAggiornamento: Date | null;

  @Column("datetime", { name: "DataInserimento", nullable: true })
  dataInserimento: Date | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  // @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.iEgas)
  // @JoinColumn([{ name: "IDPaziente", referencedColumnName: "id" }])
  // idPaziente2: AAnagrafica;

  // @ManyToOne(() => ILaymodNome, (iLaymodNome) => iLaymodNome.iEgas)
  // @JoinColumn([{ name: "IDModelloGruppo", referencedColumnName: "id" }])
  // idModelloGruppo: ILaymodNome;

  // @OneToMany(
  //   () => IEgaimgInforendering,
  //   (iEgaimgInforendering) => iEgaimgInforendering.idegaimg
  // )
  // iEgaimgInforenderings: IEgaimgInforendering[];
}
