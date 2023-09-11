import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { APazienti } from ".";

@Index("IX_A-PAZIENTI-DISPONIBILITA", ["idAnagrafica", "giorno"], {})
@Index("PK_A-PAZIENTI-DISPONIBILITA", ["id"], { unique: true })
@Entity("A-PAZIENTI-DISPONIBILITA", { schema: "dbo" })
export class APazientiDisponibilita {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica", default: () => "(0)" })
  idAnagrafica: number;

  @Column("smallint", { name: "Giorno", default: () => "(0)" })
  giorno: number;

  @Column("time", { name: "OraInizio", nullable: true })
  oraInizio: Date | null;

  @Column("time", { name: "OraFine", nullable: true })
  oraFine: Date | null;

  @ManyToOne(() => APazienti, (aPazienti) => aPazienti.aPazientiDisponibilitas)
  @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  idAnagrafica2: APazienti;
}
