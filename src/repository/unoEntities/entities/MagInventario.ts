import {
  Column,
  Entity,
  Index, PrimaryGeneratedColumn
} from "typeorm";

@Index("PK_MAG-INVENTARIO", ["id"], { unique: true })
@Entity("MAG-INVENTARIO", { schema: "dbo" })
export class MagInventario {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Anno" })
  anno: number;

  @Column("int", { name: "Rimanenza" })
  rimanenza: number;

  @Column("int", { name: "NumeroCarichi" })
  numeroCarichi: number;

  @Column("money", { name: "ValoreCarichi" })
  valoreCarichi: number;

  @Column("int", { name: "NumeroScarichi" })
  numeroScarichi: number;

  @Column("money", { name: "PrezzoUltimo" })
  prezzoUltimo: number;

  @Column("money", { name: "PrezzoMedio" })
  prezzoMedio: number;

  @Column("money", { name: "PrezzoNormale" })
  prezzoNormale: number;

  @Column("money", { name: "ValoreFifo" })
  valoreFifo: number;

  @Column("money", { name: "ValoreLifoContinuo" })
  valoreLifoContinuo: number;

  @Column("money", { name: "ValoreLifoScatti" })
  valoreLifoScatti: number;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;

  @Column("bit", { name: "Lock", default: () => "(0)" })
  lock: boolean;

  // @ManyToOne(
  //   () => MagAnagrafica,
  //   (magAnagrafica) => magAnagrafica.magInventarios
  // )
  // @JoinColumn([{ name: "IDArticolo", referencedColumnName: "id" }])
  // idArticolo: MagAnagrafica;

  // @ManyToOne(() => TabSocieta, (tabSocieta) => tabSocieta.magInventarios)
  // @JoinColumn([{ name: "IDSocietà", referencedColumnName: "id" }])
  // idSociet: TabSocieta;

  // @OneToMany(
  //   () => MagInventarioStrati,
  //   (magInventarioStrati) => magInventarioStrati.idInventario
  // )
  // magInventarioStrati: MagInventarioStrati[];
}
