


type IUnoDbService = {
    anagraficaRepo: () => Promise<Repository<UnoAnagraficaEntity>>
}