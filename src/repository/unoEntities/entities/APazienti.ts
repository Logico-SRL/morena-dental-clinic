import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { AAnagrafica, APazientiDisponibilita, APazientiEsami, APazientiMedici, APazientiMemo, APazientiRichiamiConfig, APazientiTag } from '.';

@Index("PK_A-PAZIENTI", ["id",], { unique: true })
@Entity("A-PAZIENTI", { schema: "dbo" })
export class APazienti {

    @Column("int", { primary: true, name: "ID", default: () => "(0)", })
    id: number;

    @Column("int", { name: "IdOperatore", nullable: true, default: () => "(0)", })
    idOperatore: number | null;

    @Column("ntext", { name: "Nota", nullable: true })
    nota: string | null;

    @Column("int", { name: "IdPagamento", nullable: true, default: () => "(0)", })
    idPagamento: number | null;

    @Column("nvarchar", { name: "Convenzione", nullable: true, length: 30 })
    convenzione: string | null;

    @Column("smallint", { name: "Altezzacm", nullable: true, default: () => "(0)", })
    altezzacm: number | null;

    @Column("smallint", { name: "PesoKg", nullable: true, default: () => "(0)", })
    pesoKg: number | null;

    @Column("int", { name: "IdListino", nullable: true, default: () => "(0)", })
    idListino: number | null;

    @Column("float", { name: "Sconto", nullable: true, precision: 53, default: () => "(0)", })
    sconto: number | null;

    @Column("smallint", { name: "FlagPaziente", nullable: true })
    flagPaziente: number | null;

    @Column("nvarchar", { name: "TesseraSanitaria", nullable: true, length: 20 })
    tesseraSanitaria: string | null;

    @Column("bit", { name: "flagTel", nullable: true })
    flagTel: boolean | null;

    @Column("bit", { name: "flagLettera", nullable: true })
    flagLettera: boolean | null;

    @Column("bit", { name: "flagSMS", nullable: true })
    flagSms: boolean | null;

    @Column("bit", { name: "flagEMail", nullable: true })
    flagEMail: boolean | null;

    @Column("nvarchar", { name: "GUID", nullable: true, length: 50 })
    guid: string | null;

    @OneToOne(() => AAnagrafica, aAnagrafica => aAnagrafica.aPazienti)
    @JoinColumn([{ name: "ID", referencedColumnName: "id" }])
    aAnagrafica: AAnagrafica;

    @OneToMany(() => APazientiDisponibilita, aPazientiDisponibilita => aPazientiDisponibilita.idAnagrafica2)


    aPazientiDisponibilitas: APazientiDisponibilita[];

    @OneToMany(() => APazientiEsami, aPazientiEsami => aPazientiEsami.idAnagrafica2)


    aPazientiEsamis: APazientiEsami[];

    @OneToMany(() => APazientiMedici, aPazientiMedici => aPazientiMedici.idAnagrafica2)


    aPazientiMedicis: APazientiMedici[];

    @OneToMany(() => APazientiMemo, aPazientiMemo => aPazientiMemo.idAnagrafica2)


    aPazientiMemos: APazientiMemo[];

    @OneToMany(() => APazientiRichiamiConfig, aPazientiRichiamiConfig => aPazientiRichiamiConfig.idAnagrafica2)


    aPazientiRichiamiConfigs: APazientiRichiamiConfig[];

    @OneToMany(() => APazientiTag, aPazientiTag => aPazientiTag.idAnagrafica2)


    aPazientiTags: APazientiTag[];

}
