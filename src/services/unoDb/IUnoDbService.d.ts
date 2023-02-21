
type IUnoDbService = {
    anagraficaRepo: () => Promise<Repository<UnoAnagraficaEntity>>,
    impegniRepo: () => Promis<Repository<UnoAgImpegniEntity>>
    postazioniRepo: () => Promis<Repository<UnoTabpostazioniEntity>>
}