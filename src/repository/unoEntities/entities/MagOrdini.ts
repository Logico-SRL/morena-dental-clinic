import {
  Column,
  Entity,
  Index, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { MagOrdiniRighe } from "./MagOrdiniRighe";

@Index("IX_MAG-ORDINI-T", ["idFornitore"], {})
@Index("PK_MAG-ORDINI-T", ["id"], { unique: true })
@Entity("MAG-ORDINI", { schema: "dbo" })
export class MagOrdini {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Tipo" })
  tipo: number;

  @Column("int", { name: "NumOrdine" })
  numOrdine: number;

  @Column("datetime", { name: "DataOrdine", nullable: true })
  dataOrdine: Date | null;

  @Column("int", { name: "IDMagazzino" })
  idMagazzino: number;

  @Column("int", { name: "IDFornitore" })
  idFornitore: number;

  @Column("int", { name: "IDOperatore" })
  idOperatore: number;

  @Column("smallint", { name: "IDReparto", nullable: true })
  idReparto: number | null;

  @Column("ntext", { name: "Note", nullable: true })
  note: string | null;

  @Column("nvarchar", { name: "Divisa", nullable: true, length: 4 })
  divisa: string | null;

  @Column("bit", { name: "StatoRecord", default: () => "(0)" })
  statoRecord: boolean;

  @Column("int", { name: "IDRiferimentoFornitore", nullable: true })
  idRiferimentoFornitore: number | null;

  // @ManyToOne(() => TabSocieta, (tabSocieta) => tabSocieta.magOrdinis)
  // @JoinColumn([{ name: "IDSocietà", referencedColumnName: "id" }])
  // idSociet: TabSocieta;

  // @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.magOrdinis)
  // @JoinColumn([{ name: "IDFornitore", referencedColumnName: "id" }])
  // idFornitore2: AAnagrafica;

  @OneToMany(() => MagOrdiniRighe, (magOrdiniRighe) => magOrdiniRighe.idOrdine2)
  magOrdiniRighes: MagOrdiniRighe[];
}
