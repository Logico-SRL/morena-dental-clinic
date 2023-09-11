import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AutcomMessaggi } from ".";

@Index("PK_AUTO-ACTIONS", ["id"], { unique: true })
@Entity("AUTCOM-ACTIONS", { schema: "dbo" })
export class AutcomActions {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("smallint", { name: "Type" })
  type: number;

  @Column("nvarchar", { name: "Description", nullable: true })
  description: string | null;

  @Column("datetime", { name: "SkDateRef", nullable: true })
  skDateRef: Date | null;

  @Column("int", { name: "NextActionId", nullable: true })
  nextActionId: number | null;

  @Column("smallint", { name: "Status" })
  status: number;

  @Column("nvarchar", { name: "Result", nullable: true })
  result: string | null;

  @Column("int", { name: "ObjId" })
  objId: number;

  @Column("int", { name: "TemplateId", default: () => "(0)" })
  templateId: number;

  @OneToMany(
    () => AutcomMessaggi,
    (autcomMessaggi) => autcomMessaggi.parentAction
  )
  autcomMessaggis: AutcomMessaggi[];
}
