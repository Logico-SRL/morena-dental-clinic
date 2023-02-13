import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AAnagrafica } from "./AAnagrafica";
import { MagAnagrafica } from "./MagAnagrafica";

@Index("IX_MAG-ANAGRAFICA-ALTRIFOR", ["idFornitore", "idArticolo"], {
  unique: true,
})
@Index("PK_MAG-ANAGRAFICA-ALTRIFOR", ["id"], { unique: true })
@Entity("MAG-ANAGRAFICA-ALTRIFOR", { schema: "dbo" })
export class MagAnagraficaAltrifor {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDFornitore" })
  idFornitore: number;

  @Column("int", { name: "IDArticolo" })
  idArticolo: number;

  @Column("nvarchar", { name: "Codice", length: 20 })
  codice: string;

  @Column("nvarchar", { name: "Nota", nullable: true })
  nota: string | null;

  @Column("decimal", {
    name: "Prezzo",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  prezzo: number | null;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 100 })
  descrizione: string | null;

  // @ManyToOne(
  //   () => AAnagrafica,
  //   (aAnagrafica) => aAnagrafica.magAnagraficaAltrifors
  // )
  // @JoinColumn([{ name: "IDFornitore", referencedColumnName: "id" }])
  // idFornitore2: AAnagrafica;

  // @ManyToOne(
  //   () => MagAnagrafica,
  //   (magAnagrafica) => magAnagrafica.magAnagraficaAltrifors
  // )
  // @JoinColumn([{ name: "IDArticolo", referencedColumnName: "id" }])
  // idArticolo2: MagAnagrafica;
}
