type ProjectCategoryEntity = import('../../../repository/entities/index').ProjectCategoryEntity

type IProjectCategory = Omit<ProjectCategoryEntity, 'parentCategory' | 'childrenCategories'> & {
    parentCategory?: IProjectCategory,
    childrenCategories: IProjectCategory[]
}
