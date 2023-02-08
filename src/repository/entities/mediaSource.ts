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

    @Column({ type: 'nvarchar', nullable: true })
    baseSearch?: string;

    @Column({ type: 'text', nullable: true })
    defaultThumbnailB64?: string;

    @Column({ type: 'nvarchar', default: 'image' })
    type: mediaTypes;

    @Column({ type: 'bit', default: true })
    visible: boolean;

}


