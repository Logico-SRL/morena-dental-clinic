import { Column, Entity, PrimaryColumn } from "typeorm";
import { noImageB64 } from "../defaults/noImage";

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

    @Column({ type: 'text', default: noImageB64 })
    defaultThumbnailB64?: string;

    @Column({ type: 'nvarchar', default: 'image' })
    type: mediaTypes;

}
