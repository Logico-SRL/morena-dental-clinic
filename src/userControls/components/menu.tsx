// 'use client'
import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';

const Comp = (props: MenuProps) => {

    // const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    const { asPath } = useRouter();

    // const path = (asPath || '').split()
    const selectedKeys = [asPath || '']

    console.info(`selectedKeys => ${selectedKeys}`)

    return <Menu {...props} selectedKeys={selectedKeys} />

}

export default Comp;