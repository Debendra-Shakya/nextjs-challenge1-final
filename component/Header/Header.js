import Head from 'next/head';
import styles from './Header.module.css'

const Header = ({ title }) => {
    return (
        <header>
            <Head >
                <title >{title}</title>
            </Head>
            <h1 className={styles.headTitle}>{title}</h1>
        </header>
    );
};

export default Header;