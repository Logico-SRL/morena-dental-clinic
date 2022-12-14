import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity({
    name: "app_users"
})
export class AppUserEntity {

    @PrimaryColumn()
    id: string;

    @Column({ default: false })
    allowed: boolean

    @Column({ nullable: true })
    name?: string

}
