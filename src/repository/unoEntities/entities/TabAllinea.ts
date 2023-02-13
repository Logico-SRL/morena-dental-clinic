import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IX_TAB-ALLINEA", ["iDdb", "tabella", "idMaster"], {})
@Index("PK_TAB-ALLINEA", ["id"], { unique: true })
@Entity("TAB-ALLINEA", { schema: "dbo" })
export class TabAllinea {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "IDdb" })
  iDdb: number;

  @Column("smallint", { name: "Tabella" })
  tabella: number;

  @Column("int", { name: "IDMaster" })
  idMaster: number;

  @Column("int", { name: "IDLocal" })
  idLocal: number;
}
