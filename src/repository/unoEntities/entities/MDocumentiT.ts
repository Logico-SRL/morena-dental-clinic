import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AAnagrafica, MDocumentiR } from ".";

@Index("IX_M-DOCUMENTI-T", ["idAnagrafica", "progetto", "tipo"], {
  unique: true,
})
@Index("PK_M-DOCUMENTI-T", ["id"], { unique: true })
@Entity("M-DOCUMENTI-T", { schema: "dbo" })
export class MDocumentiT {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica", default: () => "(0)" })
  idAnagrafica: number;

  @Column("nvarchar", { name: "Progetto", nullable: true, length: 50 })
  progetto: string | null;

  @Column("smallint", { name: "Tipo", nullable: true })
  tipo: number | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(-1)" })
  statoRecord: boolean | null;

  @OneToMany(() => MDocumentiR, (mDocumentiR) => mDocumentiR.idTestata2)
  mDocumentiRs: MDocumentiR[];

  @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.mDocumentiTs)
  @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  idAnagrafica2: AAnagrafica;
}
