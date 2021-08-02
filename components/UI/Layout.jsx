import Head from 'next/head';

const Layout = (props) => {
    return (
        <>
            <Head>
                <title>Pritam Halder</title>
                <meta name='title' content='Pritam Halder Portfolio' />
                <link rel='shortcut icon' href='favicon.ico' type='image/x-icon' />
                <meta name='robots' content='index, follow' />
                <meta
                    name='description'
                    content="I'm a Kolkata based software engineer who specializes in building and designing full stack products leading projects from research to implementation."
                />
                <meta name='author' content='poseidon-code' />
                <meta
                    name='keywords'
                    content='portfolio, pritam halder, pritam, developer, pritam halder portfolio, designer portfolio, creative portfolio'
                />
            </Head>
            <main className='container'>{props.children}</main>
        </>
    );
};

export default Layout;
