import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AAnagraficaFamiglia } from './AAnagraficaFamiglia'
import { AAnagraficaIndirizzi } from './AAnagraficaIndirizzi'
import { AAnagraficaRecapiti } from './AAnagraficaRecapiti'
import { AAnagraficaTutori } from './AAnagraficaTutori'
import { AgImpegni } from './AgImpegni'
import { APazienti } from './APazienti'
import { APazientiAnamnesi } from './APazientiAnamnesi'
import { APazientiMedici } from './APazientiMedici'
import { APostit } from './APostit'
import { CIncassiOperatori } from './CIncassiOperatori'
import { CRate } from './CRate'
import { CSituazionecontabile } from './CSituazionecontabile'
import { IEga } from './IEga'
import { IEgaimgInforx } from './IEgaimgInforx'
import { MagAnagraficaAltrifor } from './MagAnagraficaAltrifor'
import { MagOrdini } from './MagOrdini'
import { MCureTestata } from './MCureTestata'
import { MDiarioAnnotazioni } from './MDiarioAnnotazioni'
import { MDocumentiT } from './MDocumentiT'
import { MIgieneTestata } from './MIgieneTestata'
import { MImpiantiTestata } from './MImpiantiTestata'
import { MOrtoTestata } from './MOrtoTestata'
import { MPerioTestata } from './MPerioTestata'
import { MRichiami } from './MRichiami'
import { MSituazioneDente } from './MSituazioneDente'
import { TabOperatori } from './TabOperatori'
import { TabSocieta } from './TabSocieta'


@Index("A-INDIRIZZI_PK", ["id",], { unique: true })
@Index("IX_A-ANAGRAFICA", ["cognome", "nome",], {})
@Entity("A-ANAGRAFICA", { schema: "dbo" })
export class AAnagrafica {

    @PrimaryGeneratedColumn({ type: "int", name: "ID" })
    id: number;

    @Column("nvarchar", { name: "Cognome", nullable: true, length: 35 })
    cognome: string | null;

    @Column("nvarchar", { name: "Cognome2", nullable: true, length: 35 })
    cognome2: string | null;

    @Column("nvarchar", { name: "Nome", nullable: true, length: 35 })
    nome: string | null;

    @Column("nvarchar", { name: "CodiceFiscale", nullable: true, length: 20 })
    codiceFiscale: string | null;

    @Column("nvarchar", { name: "PartitaIva", nullable: true, length: 20 })
    partitaIva: string | null;

    @Column("nvarchar", { name: "Professione", nullable: true, length: 20 })
    professione: string | null;

    @Column("nvarchar", { name: "Esordio", nullable: true, length: 15 })
    esordio: string | null;

    @Column("nvarchar", { name: "Titolo", nullable: true, length: 10 })
    titolo: string | null;

    @Column("nvarchar", { name: "Contatto", nullable: true, length: 35 })
    contatto: string | null;

    @Column("ntext", { name: "Nota", nullable: true })
    nota: string | null;

    @Column("datetime", { name: "DataNascita", nullable: true })
    dataNascita: Date | null;

    @Column("nvarchar", { name: "LuogoNascita", nullable: true, length: 30 })
    luogoNascita: string | null;

    @Column("nvarchar", { name: "Varie", nullable: true, length: 40 })
    varie: string | null;

    @Column("nvarchar", { name: "Sesso", nullable: true, length: 1, default: () => "'M'", })
    sesso: string | null;

    @Column("nvarchar", { name: "Codice", nullable: true, length: 10 })
    codice: string | null;

    @Column("int", { name: "IdCategoria", nullable: true })
    idCategoria: number | null;

    @Column("int", { name: "IDSocietà", nullable: true, default: () => "(0)", })
    idSociet: number | null;

    @Column("datetime", { name: "DataRegistrazione", nullable: true })
    dataRegistrazione: Date | null;

    @Column("datetime", { name: "TimeStamp", nullable: true })
    timeStamp: Date | null;

    @Column("bit", { name: "StatoRecord", default: () => "(1)", })
    statoRecord: boolean;

    @Column("bit", { name: "RifiutaTS", nullable: true })
    rifiutaTs: boolean | null;

    @Column("int", { name: "TipoContatto", nullable: true })
    tipoContatto: number | null;

    @Column("datetime", { name: "DataArchiviazione", nullable: true })
    dataArchiviazione: Date | null;

    @Column("nvarchar", { name: "FeCodDestinatario", nullable: true, length: 7 })
    feCodDestinatario: string | null;

    @Column("nvarchar", { name: "FeCodPagRA", nullable: true, length: 2 })
    feCodPagRa: string | null;

    @Column("nvarchar", { name: "FeTipoRA", nullable: true, length: 4 })
    feTipoRa: string | null;

    @Column("datetime", { name: "Inserted", nullable: true })
    inserted: Date | null;

    @Column("datetime", { name: "Updated", nullable: true })
    updated: Date | null;

    @Column("int", { name: "IDReferente", nullable: true })
    idReferente: number | null;

    // @OneToMany(() => AAnagraficaFamiglia, aAnagraficaFamiglia => aAnagraficaFamiglia.id3)


    // aAnagraficaFamiglias: AAnagraficaFamiglia[];

    // @OneToMany(() => AAnagraficaFamiglia, aAnagraficaFamiglia => aAnagraficaFamiglia.id4)


    // aAnagraficaFamiglias2: AAnagraficaFamiglia[];

    // @OneToMany(() => AAnagraficaIndirizzi, aAnagraficaIndirizzi => aAnagraficaIndirizzi.idAnagrafica2)


    // aAnagraficaIndirizzis: AAnagraficaIndirizzi[];

    // @OneToMany(() => AAnagraficaRecapiti, aAnagraficaRecapiti => aAnagraficaRecapiti.idAnagrafica2)


    // aAnagraficaRecapitis: AAnagraficaRecapiti[];

    // @OneToMany(() => AAnagraficaTutori, aAnagraficaTutori => aAnagraficaTutori.idAnagrafica2)


    // aAnagraficaTutoris: AAnagraficaTutori[];

    // @OneToMany(() => AAnagraficaTutori, aAnagraficaTutori => aAnagraficaTutori.idTutore2)


    // aAnagraficaTutoris2: AAnagraficaTutori[];

    // @OneToMany(() => AgImpegni, agImpegni => agImpegni.idAnagrafica2)


    // agImpegnis: AgImpegni[];

    // // @OneToOne(()=>APazienti,aPazienti=>aPazienti.)


    // // aPazienti:APazienti;

    // @OneToMany(() => APazientiAnamnesi, aPazientiAnamnesi => aPazientiAnamnesi.idAnagrafica)


    // aPazientiAnamnesis: APazientiAnamnesi[];

    // @OneToMany(() => APazientiMedici, aPazientiMedici => aPazientiMedici.idMedico2)


    // aPazientiMedicis: APazientiMedici[];

    // @OneToMany(() => APostit, aPostit => aPostit.idAnagrafica2)


    // aPostits: APostit[];

    // @OneToMany(() => CIncassiOperatori, cIncassiOperatori => cIncassiOperatori.idOperatore2)


    // cIncassiOperatoris: CIncassiOperatori[];

    // @OneToMany(() => CRate, cRate => cRate.idAnagrafica)


    // cRates: CRate[];

    // @OneToMany(() => CSituazionecontabile, cSituazionecontabile => cSituazionecontabile.idAnagrafica2)


    // cSituazionecontabiles: CSituazionecontabile[];

    // @OneToMany(() => IEga, iEga => iEga.idPaziente2)


    // iEgas: IEga[];

    // @OneToMany(() => IEgaimgInforx, iEgaimgInforx => iEgaimgInforx.idPaziente2)


    // iEgaimgInforxes: IEgaimgInforx[];

    // @OneToMany(() => MagAnagraficaAltrifor, magAnagraficaAltrifor => magAnagraficaAltrifor.idFornitore2)


    // magAnagraficaAltrifors: MagAnagraficaAltrifor[];

    // @OneToMany(() => MagOrdini, magOrdini => magOrdini.idFornitore2)


    // magOrdinis: MagOrdini[];

    // @OneToMany(() => MCureTestata, mCureTestata => mCureTestata.idAnagrafica2)


    // mCureTestatas: MCureTestata[];

    // @OneToMany(() => MDiarioAnnotazioni, mDiarioAnnotazioni => mDiarioAnnotazioni.idAnagrafica2)


    // mDiarioAnnotazionis: MDiarioAnnotazioni[];

    // @OneToMany(() => MDocumentiT, mDocumentiT => mDocumentiT.idAnagrafica2)


    // mDocumentiTs: MDocumentiT[];

    // @OneToMany(() => MIgieneTestata, mIgieneTestata => mIgieneTestata.idAnagrafica2)


    // mIgieneTestatas: MIgieneTestata[];

    // @OneToMany(() => MImpiantiTestata, mImpiantiTestata => mImpiantiTestata.idAnagrafica2)


    // mImpiantiTestatas: MImpiantiTestata[];

    // @OneToMany(() => MOrtoTestata, mOrtoTestata => mOrtoTestata.idAnagrafica2)


    // mOrtoTestatas: MOrtoTestata[];

    // @OneToMany(() => MPerioTestata, mPerioTestata => mPerioTestata.idAnagrafica2)


    // mPerioTestatas: MPerioTestata[];

    // @OneToMany(() => MRichiami, mRichiami => mRichiami.idAnagrafica)


    // mRichiamis: MRichiami[];

    // @OneToMany(() => MSituazioneDente, mSituazioneDente => mSituazioneDente.idAnagrafica2)


    // mSituazioneDentes: MSituazioneDente[];

    // // @OneToOne(()=>TabOperatori,tabOperatori=>tabOperatori.)


    // // tabOperatori:TabOperatori;

    // @OneToMany(() => TabSocieta, tabSocieta => tabSocieta.idSedeOperativa)


    // tabSocietas: TabSocieta[];

    // @OneToMany(() => TabSocieta, tabSocieta => tabSocieta.idSedeLegale)


    // tabSocietas2: TabSocieta[];

}
