import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: "mediaSources"
})

export class MediaSourceEntity {

    @PrimaryColumn()
    id: string;

    @Column({ type: 'nvarchar' })
    name: string;

    @Column({ type: 'nvarchar', nullable: true })
    basePath?: string;

}
