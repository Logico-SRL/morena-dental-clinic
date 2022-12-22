'use client'
import { Menu, MenuProps } from 'antd';
import { usePathname } from 'next/navigation';

const Comp = (props: MenuProps) => {

    // const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    const pathname = usePathname();
    const selectedKeys = [pathname || '']

    console.info(`selectedKeys => ${selectedKeys}`)

    return <Menu {...props} selectedKeys={selectedKeys} />

}

export default Comp;