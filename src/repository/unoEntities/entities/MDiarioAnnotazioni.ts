import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AAnagrafica } from ".";

@Index("IX_M-DIARIO-ANNOTAZIONI", ["idAnagrafica", "data"], {})
@Index("PK_M-DIARIO-ANNOTAZIONI", ["id"], { unique: true })
@Entity("M-DIARIO-ANNOTAZIONI", { schema: "dbo" })
export class MDiarioAnnotazioni {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica" })
  idAnagrafica: number;

  @Column("ntext", { name: "Note" })
  note: string;

  @Column("datetime", { name: "Data" })
  data: Date;

  @Column("smallint", { name: "Tipo", nullable: true })
  tipo: number | null;

  @Column("smallint", { name: "IDDente", nullable: true })
  idDente: number | null;

  @Column("int", { name: "IDobj", nullable: true, default: () => "(0)" })
  iDobj: number | null;

  @Column("int", { name: "Colore", nullable: true })
  colore: number | null;

  @ManyToOne(
    () => AAnagrafica,
    (aAnagrafica) => aAnagrafica.mDiarioAnnotazionis
  )
  @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  idAnagrafica2: AAnagrafica;
}
