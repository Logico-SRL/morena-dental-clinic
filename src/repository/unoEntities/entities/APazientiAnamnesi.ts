import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AAnagrafica, APazientiAnamnesiRighe } from ".";

@Index("PK_A-PAZIENTI-ANAMNESI_", ["id"], { unique: true })
@Entity("A-PAZIENTI-ANAMNESI", { schema: "dbo" })
export class APazientiAnamnesi {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("datetime", { name: "Data" })
  data: Date;

  @Column("smallint", { name: "Gravità", default: () => "(0)" })
  gravit: number;

  @Column("smallint", { name: "Tipo", nullable: true })
  tipo: number | null;

  @Column("smallint", { name: "codiceASA", nullable: true })
  codiceAsa: number | null;

  @ManyToOne(() => AAnagrafica, (aAnagrafica) => aAnagrafica.aPazientiAnamnesis)
  @JoinColumn([{ name: "IdAnagrafica", referencedColumnName: "id" }])
  idAnagrafica: AAnagrafica;

  @OneToMany(
    () => APazientiAnamnesiRighe,
    (aPazientiAnamnesiRighe) => aPazientiAnamnesiRighe.idTestata
  )
  aPazientiAnamnesiRighes: APazientiAnamnesiRighe[];
}
