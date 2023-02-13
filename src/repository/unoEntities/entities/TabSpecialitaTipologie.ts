import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IX_AM-POSIZIONI", ["idSpecialit"], {})
@Index("PK_TAB-POSIZIONI", ["id"], { unique: true })
@Entity("TAB-SPECIALITA-TIPOLOGIE", { schema: "dbo" })
export class TabSpecialitaTipologie {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDSpecialità", default: () => "(0)" })
  idSpecialit: number;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 25 })
  descrizione: string | null;

  @Column("smallint", { name: "Elementi", nullable: true })
  elementi: number | null;

  @Column("bit", { name: "StatoRecord", default: () => "(1)" })
  statoRecord: boolean;
}
