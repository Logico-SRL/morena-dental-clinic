import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { MediaEntity, ProjectEntity } from ".";

@Entity({
    name: "visits"
})
export class VisitEntity {

    @PrimaryColumn()
    id: string;

    @Column({ type: 'nvarchar' })
    title: string;

    @Column({ type: 'datetime' })
    createdOn: Date;

    @Column({ type: 'datetime', nullable: true })
    visitDate?: Date;

    @Column({ type: 'text', nullable: true })
    diagnosis?: string;

    @Column({ type: 'text', nullable: true })
    treatment?: string;

    @Column({ type: 'text', nullable: true })
    followUp?: string;

    @Column({ type: 'nvarchar' })
    type: VisitTypes;

    @ManyToOne(type => ProjectEntity, pro => pro.visits)
    project: ProjectEntity

    @OneToMany(type => MediaEntity, pro => pro.visit)
    media: MediaEntity[]
}
