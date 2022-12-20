type PageParams = Record<string, string>
type PageProps = {
    params: any
    searchParams?: any
}
type LayoutProps = {
    children: React.ReactNode
    params: any
}

type PageComponent = (props: PageProps) => React.ReactNode | Promise<React.ReactNode>
type LayoutComponent = (props: LayoutProps) => React.ReactNode | Promise<React.ReactNode>