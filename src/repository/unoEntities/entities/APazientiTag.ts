import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { APazienti, TabTag } from ".";

@Index("IX_A-PAZIENTI-TAG", ["idAnagrafica", "idtag"], {})
@Index("PK_A-PAZIENTI-TAG", ["id"], { unique: true })
@Entity("A-PAZIENTI-TAG", { schema: "dbo" })
export class APazientiTag {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDAnagrafica", default: () => "(0)" })
  idAnagrafica: number;

  @Column("int", { name: "IDTAG", default: () => "(0)" })
  idtag: number;

  @ManyToOne(() => APazienti, (aPazienti) => aPazienti.aPazientiTags)
  @JoinColumn([{ name: "IDAnagrafica", referencedColumnName: "id" }])
  idAnagrafica2: APazienti;

  @ManyToOne(() => TabTag, (tabTag) => tabTag.aPazientiTags)
  @JoinColumn([{ name: "IDTAG", referencedColumnName: "id" }])
  idtag2: TabTag;
}
