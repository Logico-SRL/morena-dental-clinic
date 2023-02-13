import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_ST-TODOLIST", ["id"], { unique: true })
@Entity("ST-TODOLIST", { schema: "dbo" })
export class StTodolist {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "IDSocietà" })
  idSociet: number;

  @Column("datetime", { name: "Data", nullable: true })
  data: Date | null;

  @Column("nvarchar", { name: "Descrizione", nullable: true, length: 100 })
  descrizione: string | null;

  @Column("smallint", { name: "Livello", nullable: true })
  livello: number | null;
}
