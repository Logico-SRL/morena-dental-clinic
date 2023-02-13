import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IX_TAB-PIANODEICONTI", ["mastro", "conto", "sottoconto"], {
  unique: true,
})
@Index("PK_TAB-PIANODEICONTI", ["id"], { unique: true })
@Entity("TAB-PIANODEICONTI", { schema: "dbo" })
export class TabPianodeiconti {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Mastro" })
  mastro: number;

  @Column("int", { name: "Conto" })
  conto: number;

  @Column("int", { name: "Sottoconto" })
  sottoconto: number;

  @Column("nvarchar", { name: "Descrizione", length: 30 })
  descrizione: string;

  @Column("smallint", { name: "Tipo" })
  tipo: number;

  @Column("bit", { name: "StatoRecord" })
  statoRecord: boolean;
}
