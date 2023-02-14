import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { AAnagrafica } from "./AAnagrafica";
import { UnoAnagraficaEntity } from "..";

@Index("IX_A-INDIRIZZIA-INDIRIZZI-RECAPITI", ["idAnagrafica"], {})
@Index("PK_A-INDIRIZZI-RECAPITI", ["id"], { unique: true })
@Entity("A-ANAGRAFICA-RECAPITI", { schema: "dbo" })
export class AAnagraficaRecapiti {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IdAnagrafica", nullable: true, default: () => "(0)" })
  idAnagrafica: number | null;

  @Column("smallint", { name: "Tipo", nullable: true, default: () => "(0)" })
  tipo: number | null;

  @Column("nvarchar", { name: "Recapito", nullable: true, length: 50 })
  recapito: string | null;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  @Column("nvarchar", { name: "SCIPTag", nullable: true, length: 10 })
  scipTag: string | null;

  // @ManyToOne(
  //   () => UnoAnagraficaEntity,
  //   (aAnagrafica) => aAnagrafica.aAnagraficaRecapitis
  // )
  // @JoinColumn([{ name: "IdAnagrafica", referencedColumnName: "id" }])
  // idAnagrafica2: UnoAnagraficaEntity;
}
