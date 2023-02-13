import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { APazientiEsami } from "./APazientiEsami";

@Index("PK_ESAMI", ["id"], { unique: true })
@Entity("TAB-ESAMI", { schema: "dbo" })
export class TabEsami {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Tipo" })
  tipo: number;

  @Column("nvarchar", { name: "Esame", length: 50 })
  esame: string;

  @Column("ntext", { name: "HelperRisultati", nullable: true })
  helperRisultati: string | null;

  @Column("ntext", { name: "HelperValori", nullable: true })
  helperValori: string | null;

  @Column("bit", { name: "StatoRecord", nullable: true })
  statoRecord: boolean | null;

  // @OneToMany(() => APazientiEsami, (aPazientiEsami) => aPazientiEsami.idEsame2)
  // aPazientiEsamis: APazientiEsami[];
}
