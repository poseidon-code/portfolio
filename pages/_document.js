import Document, { Html, Head, Main, NextScript } from 'next/document';

class AppDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default AppDocument;
