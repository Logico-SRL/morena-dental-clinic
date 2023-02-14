import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UnoAnagraficaEntity } from "..";

@Index("IX_A-INDIRIZZIA-INDIRIZZI-FAMIGLIA", ["id1"], {})
@Index("IX_A-INDIRIZZIA-INDIRIZZI-FAMIGLIA1", ["id2"], {})
@Index("PK_A-ANAGRAFICA-FAMIGLIA", ["id"], { unique: true })
@Entity("A-ANAGRAFICA-FAMIGLIA", { schema: "dbo" })
export class AAnagraficaFamiglia {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "ID1", default: () => "(0)" })
  id1: number;

  @Column("int", { name: "ID2", default: () => "(0)" })
  id2: number;

  @Column("smallint", { name: "Tipo", default: () => "(0)" })
  tipo: number;

  @Column("bit", { name: "IsTutore" })
  isTutore: boolean;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  @ManyToOne(
    () => UnoAnagraficaEntity,
    (aAnagrafica) => aAnagrafica.aAnagraficaFamiglias
  )
  @JoinColumn([{ name: "ID1", referencedColumnName: "id" }])
  id3: UnoAnagraficaEntity;

  @ManyToOne(
    () => UnoAnagraficaEntity,
    (aAnagrafica) => aAnagrafica.aAnagraficaFamiglias2
  )
  @JoinColumn([{ name: "ID2", referencedColumnName: "id" }])
  id4: UnoAnagraficaEntity;
}
