import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import ErrorButton from "./errorButton";

const name = "RTK-Query SSR example";
export const siteTitle = name;

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className={styles.main}>
        <Search />
        <Pagination />

        <main>{children}</main>

        <ErrorButton />
    </div>

    // <div className={styles.container}>
    //   <header className={styles.header}>
    //     {home ? (
    //       <>
    //         <h1 className={utilStyles.heading2Xl}>{name}</h1>
    //       </>
    //     ) : (
    //       <>
    //         <h2 className={utilStyles.headingLg}>
    //           <Link href="/">
    //             <a className={utilStyles.colorInherit}>{name}</a>
    //           </Link>
    //         </h2>
    //       </>
    //     )}
    //   </header>
    //   <main>{children}</main>
    //   {!home && (
    //     <div className={styles.backToHome}>
    //       <Link href="/">
    //         <a>← Back to home</a>
    //       </Link>
    //     </div>
    //   )}
    // </div>
  );
}