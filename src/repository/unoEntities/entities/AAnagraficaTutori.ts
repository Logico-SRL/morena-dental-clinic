import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AAnagrafica } from ".";

@Index("IX_A-ANAGRAFICA-TUTORI", ["idAnagrafica", "idTutore"], {})
@Index("PK_A-INDIRIZZI-TUTORI", ["id"], { unique: true })
@Entity("A-ANAGRAFICA-TUTORI", { schema: "dbo" })
export class AAnagraficaTutori {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IdAnagrafica", default: () => "(0)" })
  idAnagrafica: number;

  @Column("int", { name: "IdTutore", default: () => "(0)" })
  idTutore: number;

  @Column("smallint", { name: "Tipo", nullable: true, default: () => "(0)" })
  tipo: number | null;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.aAnagraficaTutoris)
  @JoinColumn([{ name: "IdAnagrafica", referencedColumnName: "id" }])
  idAnagrafica2: AAnagrafica;

  @ManyToOne(
    () => AAnagrafica,
    (aAnagrafica) => aAnagrafica.aAnagraficaTutoris2
  )
  @JoinColumn([{ name: "IdTutore", referencedColumnName: "id" }])
  idTutore2: AAnagrafica;
}
