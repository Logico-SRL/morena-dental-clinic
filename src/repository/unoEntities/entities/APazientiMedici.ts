import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { APazienti } from "./APazienti";
import { AAnagrafica } from "./AAnagrafica";

@Index("IX_A-PAZIENTI-MEDICI", ["idAnagrafica", "idMedico"], {})
@Index("PK_A-PAZIENTI-MEDICI", ["id"], { unique: true })
@Entity("A-PAZIENTI-MEDICI", { schema: "dbo" })
export class APazientiMedici {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica", default: () => "(0)" })
  idAnagrafica: number;

  @Column("int", { name: "IDMedico", default: () => "(0)" })
  idMedico: number;

  @Column("smallint", { name: "Tipo", nullable: true, default: () => "(0)" })
  tipo: number | null;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  // @ManyToOne(() => APazienti, (aPazienti) => aPazienti.aPazientiMedicis)
  // @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  // idAnagrafica2: APazienti;

  // @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.aPazientiMedicis)
  // @JoinColumn([{ name: "IDMedico", referencedColumnName: "id" }])
  // idMedico2: AAnagrafica;
}
