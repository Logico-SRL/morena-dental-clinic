// 'use client'
import UserControls from "@uc"
import styles from "./footer.module.scss"
// import packageJSON from "../package.json"

export const Footer = () => {
  return (
    <UserControls.Footer className={styles.footer}>
      <UserControls.Typography.Text>
        ©2022 Logico SRL
      </UserControls.Typography.Text>
    </UserControls.Footer>
  )
}
