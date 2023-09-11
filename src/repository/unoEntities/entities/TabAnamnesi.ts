import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { APazientiAnamnesiRighe } from "./APazientiAnamnesiRighe";
import { MIgienePsr } from "./MIgienePsr";

@Index(
  "IX_TAB-ANAMNESI-L1",
  ["idGruppo", "idPannello", "ordinamento", "domanda"],
  {}
)
@Index("PK_TAB-ANAMNESI-L1", ["id"], { unique: true })
@Entity("TAB-ANAMNESI", { schema: "dbo" })
export class TabAnamnesi {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("nvarchar", { name: "Domanda", length: 70 })
  domanda: string;

  @Column("smallint", { name: "Ordinamento" })
  ordinamento: number;

  @Column("smallint", { name: "Gravità" })
  gravit: number;

  @Column("smallint", { name: "IdGruppo" })
  idGruppo: number;

  @Column("smallint", { name: "IdPannello" })
  idPannello: number;

  @Column("smallint", { name: "Tipo" })
  tipo: number;

  @Column("nvarchar", { name: "Mask", nullable: true, length: 100 })
  mask: string | null;

  @Column("nvarchar", { name: "PreRisposta", nullable: true, length: 20 })
  preRisposta: string | null;

  @Column("nvarchar", { name: "PostRisposta", nullable: true, length: 20 })
  postRisposta: string | null;

  @Column("ntext", { name: "HelperRisposta", nullable: true })
  helperRisposta: string | null;

  @Column("ntext", { name: "HelperValore", nullable: true })
  helperValore: string | null;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 100 })
  descrizione: string | null;

  @Column("bit", { name: "StatoRecord", default: () => "(1)" })
  statoRecord: boolean;

  @Column("bit", { name: "Locked", nullable: true, default: () => "(0)" })
  locked: boolean | null;

  @Column("nvarchar", { name: "Cod", nullable: true, length: 3 })
  cod: string | null;

  @OneToMany(
    () => APazientiAnamnesiRighe,
    (aPazientiAnamnesiRighe) => aPazientiAnamnesiRighe.idQuesito
  )
  aPazientiAnamnesiRighes: APazientiAnamnesiRighe[];

  @OneToMany(() => MIgienePsr, (mIgienePsr) => mIgienePsr.idQuesito2)
  mIgienePsrs: MIgienePsr[];
}
