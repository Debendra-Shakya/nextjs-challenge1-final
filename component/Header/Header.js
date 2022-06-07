import Head from 'next/head';

const Header = ({ title }) => {
    return (
        <header>
            <Head>
                <title>{title}</title>
            </Head>
            <h1>{title}</h1>
        </header>
    );
};

export default Header;