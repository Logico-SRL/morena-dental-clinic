import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MagAnagrafica } from "./MagAnagrafica";

@Index("aaaaaMAG-OFFART_PK", ["id"], { unique: true })
@Index("AI-INDIRIZZIMAG-OFFART", ["idFornitore"], {})
@Index("Articolo", ["idFornitore", "idArticolo"], {})
@Index("MAG-ANAGRAFICAMAG-OFFART", ["idArticolo"], {})
@Entity("MAG-OFFERTE", { schema: "dbo" })
export class MagOfferte {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDArticolo", nullable: true })
  idArticolo: number | null;

  @Column("int", { name: "IDFornitore", nullable: true })
  idFornitore: number | null;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 100 })
  descrizione: string | null;

  @Column("datetime", { name: "DataInizioOfferta", nullable: true })
  dataInizioOfferta: Date | null;

  @Column("datetime", { name: "DataScadenza", nullable: true })
  dataScadenza: Date | null;

  @Column("bit", { name: "StatoRecord", default: () => "(0)" })
  statoRecord: boolean;

  // @ManyToOne(() => MagAnagrafica, (magAnagrafica) => magAnagrafica.magOffertes)
  // @JoinColumn([{ name: "IDArticolo", referencedColumnName: "id" }])
  // idArticolo2: MagAnagrafica;
}
