import { useLocalStorage } from 'common/hooks/useLocalStorage';
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from 'react';

interface ShoppingCartProviderProps {
	children: ReactNode;
}

interface ShoppingCartContext {
	openCart: () => void;
	closeCart: () => void;
	getItemQuantity: (id: string) => number;
	increaseCartQuantity: (id: string) => void;
	decreaseCartQuantity: (id: string) => void;
	removeAllFromCart: () => void;
	cartQuantity: number;
	cartItems: CartItem[];
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface CartItem {
	id: string;
	quantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
	children,
}: ShoppingCartProviderProps) => {
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
		'shopping-cart',
		[]
	);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const cartQuantity = cartItems?.reduce(
		(quantity, item) => item.quantity + quantity,
		0
	);

	const getItemQuantity = (id: string) => {
		return cartItems.find((item) => item.id == id)?.quantity || 0;
	};

	const increaseCartQuantity = (id: string) => {
		setIsOpen(true);
		setCartItems((currItems) => {
			if (currItems.find((item) => item.id === id) == null) {
				return [...currItems, { id, quantity: 1 }];
			} else {
				return currItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	function decreaseCartQuantity(id: string) {
		setCartItems((currItems) => {
			if (currItems.find((item) => item.id === id)?.quantity === 1) {
				return currItems.filter((item) => item.id !== id);
			} else {
				return currItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	}

	const openCart = () => {
		setIsOpen(true);
	};

	const closeCart = () => {
		setIsOpen(false);
	};

	const removeAllFromCart = () => {
		setCartItems([]);
		setIsOpen(false);
		return { id: null, quantity: 0 };
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeAllFromCart,
				cartQuantity,
				cartItems,
				openCart,
				closeCart,
				isOpen,
				setIsOpen,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};
