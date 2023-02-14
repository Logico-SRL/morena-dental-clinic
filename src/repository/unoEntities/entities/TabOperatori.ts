import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { AgImpegni } from './AgImpegni'
import { MIgieneTestata } from './MIgieneTestata'
import { MOrtoTestata } from './MOrtoTestata'
import { MPerioTestata } from './MPerioTestata'
import { AAnagrafica } from './AAnagrafica'
import { TabOperatoriPerc } from './TabOperatoriPerc'


@Index("TAB-OPERATORI_PK", ["id",], { unique: true })
@Entity("TAB-OPERATORI", { schema: "dbo" })
export class TabOperatori {

    @Column("int", { primary: true, name: "ID" })
    id: number;

    @Column("int", { name: "IdQualifica", nullable: true })
    idQualifica: number | null;

    @Column("nvarchar", { name: "Descrizione", nullable: true, length: 25 })
    descrizione: string | null;

    @Column("int", { name: "Colore", nullable: true, default: () => "(0)", })
    colore: number | null;

    @Column("nvarchar", { name: "CodInterno", nullable: true, length: 2 })
    codInterno: string | null;

    @Column("smallint", { name: "GruppoUtenti", nullable: true, default: () => "(0)", })
    gruppoUtenti: number | null;

    @Column("bit", { name: "StatoRecord", default: () => "(0)", })
    statoRecord: boolean;

    @Column("int", { name: "Ordinamento", nullable: true })
    ordinamento: number | null;

    @Column("bit", { name: "NoAgenda", nullable: true })
    noAgenda: boolean | null;

    @Column("nvarchar", { name: "ProduzioneTarget", nullable: true, length: 70 })
    produzioneTarget: string | null;

    @Column("bit", { name: "NoSCIP", default: () => "(0)", })
    noScip: boolean;

    // @OneToMany(() => AgImpegni, agImpegni => agImpegni.idOperatore3)


    // agImpegnis: AgImpegni[];

    // @OneToMany(() => MIgieneTestata, mIgieneTestata => mIgieneTestata.idOperatore)


    // mIgieneTestatas: MIgieneTestata[];

    // @OneToMany(() => MOrtoTestata, mOrtoTestata => mOrtoTestata.idOperatore)


    // mOrtoTestatas: MOrtoTestata[];

    // @OneToMany(() => MPerioTestata, mPerioTestata => mPerioTestata.idOperatore)


    // mPerioTestatas: MPerioTestata[];

    // QUI PROBLEMA typeorm-model-generator // @OneToOne(()=>AAnagrafica,aAnagrafica=>aAnagrafica.tabOperatori)
    // QUI PROBLEMA typeorm-model-generator // @JoinColumn([{ name: "ID", referencedColumnName: "id" },
    // QUI PROBLEMA typeorm-model-generator // ])
    // QUI PROBLEMA typeorm-model-generator // :AAnagrafica;

    // @OneToMany(() => TabOperatoriPerc, tabOperatoriPerc => tabOperatoriPerc.idOperatore2)


    // tabOperatoriPercs: TabOperatoriPerc[];

}
