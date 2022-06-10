import Head from 'next/head';
import { Headers } from './HeaderStyles';

const Header = ({ title }) => {
    return (
        <header>
            <Head >
                <title >{title}</title>
            </Head>
            <Headers>{title}</Headers>
        </header>
    );
};

export default Header;