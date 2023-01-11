import UserControls from "@uc";
import { Footer } from "./layout/footer/footer";
import { Header } from "./layout/header/header";
import classnames from './layout/layoutCommon.module.scss';
import { Sider } from "./layout/sider";

interface Props {
  children: React.ReactNode
}

export default function RootPageLayout({ children }: Props) {
  return (
    <UserControls.Layout className={classnames.root_page_layout}>
      <Header />
      <UserControls.Layout>
        <Sider />
        <UserControls.Content>
          {children}
        </UserControls.Content>
      </UserControls.Layout>
      <Footer />
    </UserControls.Layout>
  )
}
