import { ReactNode } from "react";
import styles from "./Layout.module.css";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className={styles.layout}>{children}</div>
);

export default Layout;
