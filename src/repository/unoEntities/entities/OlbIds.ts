import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IX_OLB-IDS_Tipo_Provider_IdExt", ["provider", "tipo", "idExt"], {
  unique: true,
})
@Index("IX_OLB-IDS_Tipo_Provider_IdInt", ["provider", "tipo", "idInt"], {
  unique: true,
})
@Index(
  "IX_OLB-IDS_Tipo_Provider_LinkedObjId",
  ["provider", "tipo", "linkedObjId"],
  {}
)
@Index("PK_OLB-IDS", ["id"], { unique: true })
@Entity("OLB-IDS", { schema: "dbo" })
export class OlbIds {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Tipo", default: () => "(0)" })
  tipo: number;

  @Column("nvarchar", { name: "Provider", nullable: true, length: 10 })
  provider: string | null;

  @Column("nvarchar", { name: "IdInt", nullable: true, length: 100 })
  idInt: string | null;

  @Column("nvarchar", { name: "IdExt", nullable: true, length: 100 })
  idExt: string | null;

  @Column("int", { name: "LinkedObjId", default: () => "(0)" })
  linkedObjId: number;

  @Column("nvarchar", { name: "Dati", nullable: true })
  dati: string | null;

  @Column("datetime", { name: "Inserted", nullable: true })
  inserted: Date | null;

  @Column("datetime", { name: "Updated", nullable: true })
  updated: Date | null;
}
