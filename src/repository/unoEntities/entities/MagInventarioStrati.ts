import {
  Column,
  Entity,
  Index, PrimaryGeneratedColumn
} from "typeorm";

@Index("PK_MAG-INVENTARIO-STRATI", ["id"], { unique: true })
@Entity("MAG-INVENTARIO-STRATI", { schema: "dbo" })
export class MagInventarioStrati {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Anno" })
  anno: number;

  @Column("int", { name: "RimanenzaLifoContinuo" })
  rimanenzaLifoContinuo: number;

  @Column("int", { name: "ScattoLifo" })
  scattoLifo: number;

  @Column("int", { name: "RimanenzaFifo" })
  rimanenzaFifo: number;

  @Column("money", { name: "PrezzoMedio" })
  prezzoMedio: number;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;

  @Column("money", { name: "ImportoFifoContinuo", nullable: true })
  importoFifoContinuo: number | null;

  @Column("money", { name: "ImportoLifoContinuo", nullable: true })
  importoLifoContinuo: number | null;

  // @ManyToOne(
  //   () => MagInventario,
  //   (magInventario) => magInventario.magInventarioStrati,
  //   { onDelete: "CASCADE", onUpdate: "CASCADE" }
  // )
  // @JoinColumn([{ name: "IDInventario", referencedColumnName: "id" }])
  // idInventario: MagInventario;
}
