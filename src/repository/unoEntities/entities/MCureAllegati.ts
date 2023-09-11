import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { MCureTestata } from ".";

@Index("IX_M-CURE-ALLEGATI", ["idTestata"], {})
@Index("PK_M-CURE-ALLEGATI", ["id"], { unique: true })
@Entity("M-CURE-ALLEGATI", { schema: "dbo" })
export class MCureAllegati {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDTestata", default: () => "(0)" })
  idTestata: number;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("smallint", {
    name: "TipoAllegato",
    nullable: true,
    default: () => "(0)",
  })
  tipoAllegato: number | null;

  @Column("bit", { name: "StatoRecord", default: () => "(1)" })
  statoRecord: boolean;

  @ManyToOne(() => MCureTestata, (mCureTestata) => mCureTestata.mCureAllegatis)
  @JoinColumn([{ name: "IDTestata", referencedColumnName: "id" }])
  idTestata2: MCureTestata;
}
