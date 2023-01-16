type CategoryEntity = import('../../../repository/entities/index').CategoryEntity

type IProjectCategory = Omit<CategoryEntity, 'parentCategory' | 'childrenCategories'> & {
    parentCategory?: IProjectCategory,
    childrenCategories: IProjectCategory[]
}
