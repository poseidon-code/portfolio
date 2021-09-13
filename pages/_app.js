import { ApolloProvider } from '@apollo/client';
import client from '../apollo';

import '../styles/globals.scss';
import Layout from '../components/UI/Layout';

const App = ({ Component, pageProps }) => {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    );
};

export default App;
