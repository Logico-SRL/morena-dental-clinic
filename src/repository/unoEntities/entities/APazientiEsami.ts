import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { APazienti } from "./APazienti";
import { TabEsami } from "./TabEsami";

@Index("IX_A-PAZIENTI-ESAMI", ["idAnagrafica", "idEsame"], {})
@Index("PK_A-PAZIENTI-ESAMI", ["id"], { unique: true })
@Entity("A-PAZIENTI-ESAMI", { schema: "dbo" })
export class APazientiEsami {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica", default: () => "(0)" })
  idAnagrafica: number;

  @Column("int", { name: "IDEsame", default: () => "(0)" })
  idEsame: number;

  @Column("datetime", { name: "DataRiferimento", nullable: true })
  dataRiferimento: Date | null;

  @Column("ntext", { name: "Risultato", nullable: true })
  risultato: string | null;

  // @ManyToOne(() => APazienti, (aPazienti) => aPazienti.aPazientiEsamis)
  // @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  // idAnagrafica2: APazienti;

  // @ManyToOne(() => TabEsami, (tabEsami) => tabEsami.aPazientiEsamis)
  // @JoinColumn([{ name: "IDEsame", referencedColumnName: "id" }])
  // idEsame2: TabEsami;
}
