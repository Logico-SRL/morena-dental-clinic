import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { VisitEntity } from ".";

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

    @Column({ type: 'text', default: '{}' })
    meta: string;

    @Column({ type: 'nvarchar' })
    type: mediaTypes;
    @ManyToOne(type => VisitEntity, v => v.media)
    visit: VisitEntity;
}
