import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AgImpegni } from "./AgImpegni";

@Index("PK_AG-RICORRENZE", ["id"], { unique: true })
@Entity("AG-RICORRENZE", { schema: "dbo" })
export class AgRicorrenze {
  @Column("int", { primary: true, name: "ID" })
  id: number;

  @Column("smallint", { name: "GiornoMese", nullable: true })
  giornoMese: number | null;

  @Column("smallint", { name: "GiornoOrd", nullable: true })
  giornoOrd: number | null;

  @Column("smallint", { name: "GiorniSettimanaMask", nullable: true })
  giorniSettimanaMask: number | null;

  @Column("smallint", { name: "PrimoGiornoSettimana", nullable: true })
  primoGiornoSettimana: number | null;

  @Column("smallint", { name: "Frequenza", nullable: true })
  frequenza: number | null;

  @Column("smallint", { name: "Intervallo", nullable: true })
  intervallo: number | null;

  @Column("smallint", { name: "MaxOccorrenze", nullable: true })
  maxOccorrenze: number | null;

  @Column("smallint", { name: "MeseAnno", nullable: true })
  meseAnno: number | null;

  @Column("datetime", { name: "RicorreFino", nullable: true })
  ricorreFino: Date | null;

  // @ManyToOne(() => AgImpegni, (agImpegni) => agImpegni.agRicorrenzes)
  // @JoinColumn([{ name: "IdImpegno", referencedColumnName: "id" }])
  // idImpegno: AgImpegni;
}
