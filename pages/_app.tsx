import '../styles/globals.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {Provider} from "react-redux";
import store from "../redux/store";
import {createWrapper} from 'next-redux-wrapper'

const client = new ApolloClient({
    uri: process.env.APOLLO_CLIENT,
    cache: new InMemoryCache()
});

function MyApp({Component, pageProps}) {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </Provider>
    );
}

const reduxWrapper = createWrapper(() => store)

export default reduxWrapper.withRedux(MyApp)
