import { theme } from "antd";
import { ThemeConfig } from "antd/es/config-provider/context";

export const antdTheme: ThemeConfig = {

    algorithm: theme.defaultAlgorithm,
    token: {
        colorPrimary: '#18CCF7'
    },
    components: {
        Menu: {
            colorItemBg: 'inherit',
            // colorBgContainer: '#DEE4EA'
        },
        Layout: {
            colorBgHeader: '#2E4151',
        }
    }
}