import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { APazientiAnamnesi, TabAnamnesi } from ".";

@Index("PK_A-PAZIENTI-ANAMNESI", ["id"], { unique: true })
@Entity("A-PAZIENTI-ANAMNESI-RIGHE", { schema: "dbo" })
export class APazientiAnamnesiRighe {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("ntext", { name: "Nota", nullable: true })
  nota: string | null;

  @Column("nvarchar", { name: "Valore", nullable: true, length: 10 })
  valore: string | null;

  @ManyToOne(
    () => APazientiAnamnesi,
    (aPazientiAnamnesi) => aPazientiAnamnesi.aPazientiAnamnesiRighes
  )
  @JoinColumn([{ name: "IdTestata", referencedColumnName: "id" }])
  idTestata: APazientiAnamnesi;

  @ManyToOne(
    () => TabAnamnesi,
    (tabAnamnesi) => tabAnamnesi.aPazientiAnamnesiRighes
  )
  @JoinColumn([{ name: "IdQuesito", referencedColumnName: "id" }])
  idQuesito: TabAnamnesi;
}
