import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { MediaEntity, ProjectEntity, TagEntity } from ".";

@Entity({
    name: "visits",

})
export class VisitEntity {

    @PrimaryColumn()
    id: string;

    @Column({ type: 'nvarchar' })
    @Index({ fulltext: true })
    title: string;

    @Column({ type: 'datetime' })
    createdOn: Date;

    @Column({ type: 'datetime', nullable: true })
    visitDate?: Date;

    @Column({ type: 'text', nullable: true })
    @Index({ fulltext: true })
    diagnosis?: string;

    @Column({ type: 'text', nullable: true })
    @Index({ fulltext: true })
    treatment?: string;

    @Column({ type: 'text', nullable: true })
    @Index({ fulltext: true })
    followUp?: string;

    @Column({ type: 'nvarchar' })
    type: VisitTypes;

    @ManyToOne(type => ProjectEntity, pro => pro.visits)
    project: ProjectEntity

    @OneToMany(type => MediaEntity, pro => pro.visit, {
        cascade: ['remove'],
        onDelete: 'CASCADE'
    })
    media: MediaEntity[]

    @ManyToMany(type => TagEntity, t => t.visits, { cascade: ['insert'] })
    @JoinTable()
    tags: TagEntity[]
}
