import { Column, Entity, Index, OneToMany } from "typeorm";
import { MCureRigheDenti } from "./MCureRigheDenti";
import { MSituazioneDente } from "./MSituazioneDente";

@Index("PK_TAB-DENTI", ["id"], { unique: true })
@Entity("TAB-DENTI", { schema: "dbo" })
export class TabDenti {
  @Column("smallint", { primary: true, name: "ID", default: () => "(0)" })
  id: number;

  @Column("nvarchar", { name: "Descrizione", length: 50 })
  descrizione: string;

  @Column("nchar", { name: "Cod", nullable: true, length: 2 })
  cod: string | null;

  @OneToMany(
    () => MCureRigheDenti,
    (mCureRigheDenti) => mCureRigheDenti.idDente2
  )
  mCureRigheDentis: MCureRigheDenti[];

  @OneToMany(
    () => MSituazioneDente,
    (mSituazioneDente) => mSituazioneDente.idDente2
  )
  mSituazioneDentes: MSituazioneDente[];
}
