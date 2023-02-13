import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AAnagrafica } from "./AAnagrafica";

@Index("C-SITUAZIONECONTABILE_IX", ["idAnagrafica"], {})
@Index("C-SITUAZIONECONTABILE_PK", ["id"], { unique: true })
@Entity("C-SITUAZIONECONTABILE", { schema: "dbo" })
export class CSituazionecontabile {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica" })
  idAnagrafica: number;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 50 })
  descrizione: string | null;

  @Column("int", { name: "IDPagamento", nullable: true })
  idPagamento: number | null;

  @Column("bit", { name: "GestisciRate", default: () => "(0)" })
  gestisciRate: boolean;

  @Column("bit", { name: "ForzaChiusura", nullable: true })
  forzaChiusura: boolean | null;

  // @ManyToOne(
  //   () => AAnagrafica,
  //   (aAnagrafica) => aAnagrafica.cSituazionecontabiles
  // )
  // @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  // idAnagrafica2: AAnagrafica;
}
