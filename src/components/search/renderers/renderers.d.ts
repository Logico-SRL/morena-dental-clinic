type RendererOptions = {
    router: AppRouterInstance
}

type ItemRendererType<T> = (item: T, { router }: RendererOptions) => React.ReactNode