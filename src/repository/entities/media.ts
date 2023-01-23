import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { VisitEntity } from ".";
import { MediaSourceEntity } from "./mediaSource";

@Entity({
    name: "media"
})

export class MediaEntity {

    @PrimaryColumn()
    id: string;

    @Column({ type: 'datetime' })
    createdOn: Date;

    @Column({ type: 'nvarchar' })
    path: string;

    @Column({ type: 'text' })
    b64Thumbnail: string;

    @Column({ type: 'text' })
    b64Preview: string;

    @Column({ type: 'text', default: '{}' })
    meta?: string;

    @Column({ type: 'nvarchar' })
    type: mediaTypes;

    @ManyToOne(type => VisitEntity, v => v.media)
    visit: VisitEntity;

    @ManyToOne(type => MediaSourceEntity)
    source: MediaSourceEntity

    @Column({ type: 'nvarchar' })
    encoding: string;

    @Column({ type: 'nvarchar' })
    filename: string;

    @Column({ type: 'nvarchar' })
    mimeType: string;

}
