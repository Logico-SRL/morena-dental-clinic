
type IUnoDbService = {
    anagraficaRepo: () => Promise<Repository<UnoAnagrafica>>,
    impegniRepo: () => Promis<Repository<UnoAgImpegniEntity>>
    postazioniRepo: () => Promis<Repository<UnoTabpostazioniEntity>>
}