import type { AppProps } from 'next/app';

// internal imports
import { ShoppingCartProvider } from 'context/ShoppingCartContext';
import 'styles/globals.css';
import 'styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ShoppingCartProvider>
			<Component {...pageProps} />
		</ShoppingCartProvider>
	);
}
