import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IX_TAB-NUMERATORI", ["tipo", "idRiferimento", "anno"], {})
@Index("PK_TAB-NUMERATORI", ["id"], { unique: true })
@Entity("TAB-NUMERATORI", { schema: "dbo" })
export class TabNumeratori {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Tipo" })
  tipo: number;

  @Column("int", { name: "IDRiferimento", default: () => "(0)" })
  idRiferimento: number;

  @Column("smallint", { name: "Anno" })
  anno: number;

  @Column("int", { name: "Numero" })
  numero: number;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 100 })
  descrizione: string | null;

  @Column("int", { name: "IDSocietà" })
  idSociet: number;

  @Column("int", { name: "Versione" })
  versione: number;
}
