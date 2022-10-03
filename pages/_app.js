import 'styles/globals.scss';
import Layout from 'components/UI/Layout';

const App = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default App;
