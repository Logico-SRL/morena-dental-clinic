import { Header } from "./layout/header"
import { Footer } from "./layout/footer"
import UserControls from "@uc"

interface Props {
  children: React.ReactNode
}

export default function RootPageLayout({ children }: Props) {
  return (
    <UserControls.Layout>
      <Header />
      <UserControls.Content>
        {children}
      </UserControls.Content>
      <Footer />
    </UserControls.Layout>
  )
}
