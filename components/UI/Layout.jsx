import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Layout = props => {
    const { pathname } = useRouter();
    const [color, setColor] = useState();

    useEffect(() => {
        if (pathname === '/about') setColor(325);
        else if (pathname === '/projects') setColor(238);
        else if (pathname === '/blog') setColor(140);
        else setColor(189);
    }, [pathname]);

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

                <meta property='og:type' content='website' />
                <meta property='og:url' content='https://pritamh.netlify.app/' />
                <meta property='og:title' content='Pritam Halder' />
                <meta
                    property='og:description'
                    content="I'm a Kolkata based software engineer who specializes in building and designing full stack products leading projects from research to implementation."
                />
                <meta property='og:image' content='/card.jpg' />

                <meta property='twitter:card' content='summary_large_image' />
                <meta property='twitter:url' content='https://pritamh.netlify.app/' />
                <meta property='twitter:title' content='Pritam Halder' />
                <meta
                    property='twitter:description'
                    content="I'm a Kolkata based software engineer who specializes in building and designing full stack products leading projects from research to implementation."
                />
                <meta property='twitter:image' content='/card.jpg' />
            </Head>

            <Navbar color={color} />
            <main className='container'>{props.children}</main>
            {pathname !== '/blog' && (
                <div className='container'>
                    <Footer color={color} />
                </div>
            )}
        </>
    );
};

export default Layout;
