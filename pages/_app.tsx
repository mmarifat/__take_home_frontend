import '../styles/globals.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
	uri: process.env.APOLLO_CLIENT,
	cache: new InMemoryCache()
});

function MyApp({Component, pageProps}) {
	return (
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
	);
}

export default MyApp
