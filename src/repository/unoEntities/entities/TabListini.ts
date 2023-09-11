import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { TabListiniRighe } from ".";

@Index("IX_TAB-LISTINI", ["descrizione"], {})
@Index("PK_TAB-LISTINI", ["id"], { unique: true })
@Entity("TAB-LISTINI", { schema: "dbo" })
export class TabListini {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Descrizione", length: 25 })
  descrizione: string;

  @Column("smallint", { name: "Tipo" })
  tipo: number;

  @Column("int", { name: "IdAnagrafica" })
  idAnagrafica: number;

  @Column("bit", { name: "StatoRecord" })
  statoRecord: boolean;

  @OneToMany(
    () => TabListiniRighe,
    (tabListiniRighe) => tabListiniRighe.idListino2
  )
  tabListiniRighes: TabListiniRighe[];
}
