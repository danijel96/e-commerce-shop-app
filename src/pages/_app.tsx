import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

// internal imports
import { ShoppingCartProvider } from 'context/ShoppingCartContext';
import 'styles/globals.css';
import 'styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig value={{ revalidateOnFocus: false, provider: () => new Map() }}>
			<ShoppingCartProvider>
				<Component {...pageProps} />
			</ShoppingCartProvider>
		</SWRConfig>
	);
}
