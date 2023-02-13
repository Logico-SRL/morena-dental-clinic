import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MImpiantiTestata } from "./MImpiantiTestata";

@Index("IX_M-IMPIANTI-FASI", ["idTestata", "idFase"], {})
@Index("M-IMPIANTI-FASI_PK", ["id"], { unique: true })
@Entity("M-IMPIANTI-FASI", { schema: "dbo" })
export class MImpiantiFasi {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTestata" })
  idTestata: number;

  @Column("int", { name: "IdFase" })
  idFase: number;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  @Column("datetime", { name: "DataAggiornamento", nullable: true })
  dataAggiornamento: Date | null;

  @Column("datetime", { name: "DataInserimento", nullable: true })
  dataInserimento: Date | null;

  @Column("bit", { name: "StatoRecord", nullable: true, default: () => "(1)" })
  statoRecord: boolean | null;

  // @ManyToOne(
  //   () => MImpiantiTestata,
  //   (mImpiantiTestata) => mImpiantiTestata.mImpiantiFasis,
  //   { onDelete: "CASCADE", onUpdate: "CASCADE" }
  // )
  // @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  // idTestata2: MImpiantiTestata;
}
