import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { APazienti } from "./APazienti";

@Index("IX_A-PAZIENTI-RICHIAMI-CONFIG", ["idAnagrafica", "tipoRichiamo"], {
  unique: true,
})
@Index("PK_A-PAZIENTI-RICHIAMI", ["id"], { unique: true })
@Entity("A-PAZIENTI-RICHIAMI-CONFIG", { schema: "dbo" })
export class APazientiRichiamiConfig {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica", default: () => "(0)" })
  idAnagrafica: number;

  @Column("int", { name: "TipoRichiamo" })
  tipoRichiamo: number;

  @Column("smallint", {
    name: "GgRichiamo",
    nullable: true,
    default: () => "(0)",
  })
  ggRichiamo: number | null;

  // @ManyToOne(() => APazienti, (aPazienti) => aPazienti.aPazientiRichiamiConfigs)
  // @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  // idAnagrafica2: APazienti;
}
