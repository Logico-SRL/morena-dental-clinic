import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AAnagrafica } from ".";

@Index("IX_A-PAZIENTI-POSTIT", ["idAnagrafica"], {})
@Index("PK_A-PAZIENTI-POSTIT", ["id"], { unique: true })
@Entity("A-POSTIT", { schema: "dbo" })
export class APostit {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Tipo" })
  tipo: number;

  @Column("int", { name: "IDAnagrafica", default: () => "(0)" })
  idAnagrafica: number;

  @Column("ntext", { name: "PostIt", nullable: true })
  postIt: string | null;

  @Column("int", { name: "Colore", nullable: true })
  colore: number | null;

  @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.aPostits)
  @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  idAnagrafica2: AAnagrafica;
}
