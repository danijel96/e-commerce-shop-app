import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

// internal imports
import { ProductsPayload } from 'common/contracts/api/payload/products.contracts';
import { Product } from 'common/contracts/product';
import { isDomainError } from 'common/services/api/config';
import { getAllProductsAPI } from 'common/services/api/product';
import { SpinnerLoader } from 'components/Atoms/SpinnerLoader';
import { useShoppingCart } from 'context/ShoppingCartContext';
import { CartItem } from './CartItem/CartItem';
import { ErrorComponent } from 'components/Atoms/ErrorComponent';

export const ShoppingCart = () => {
	const {
		cartQuantity,
		cartItems,
		removeAllFromCart,
		closeCart,
		isOpen,
		setIsOpen,
	} = useShoppingCart();

	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const [products, setProducts] = useState<Product[] | undefined>(undefined);

	const getProducts = async () => {
		const payload: ProductsPayload = {
			page: 1,
			limit: 30,
		};
		const response = await getAllProductsAPI(payload);
		if (isDomainError(response)) {
			alert('Something went wrong. Try later!');
			setIsError(true);
			return;
		}

		setIsLoading(false);
		setProducts(response.products);
	};

	useEffect(() => {
		getProducts();
	}, []);

	useEffect(() => {
		document.addEventListener('click', closeCart);

		return () => {
			document.removeEventListener('click', closeCart);
		};
	}, [closeCart]);

	if (isLoading) {
		return <SpinnerLoader component />;
	}

	if (isError) {
		return <ErrorComponent />;
	}

	return (
		<div className="relative w-10 cursor-pointer">
			<div
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen(!isOpen);
				}}
			>
				<ShoppingCartIcon width={25} />
				{cartQuantity > 0 && (
					<p className="absolute bottom-0 right-[15px] w-3 h-3 translate-y-2/3 translate-x-2/3 bg-[black] text-white flex justify-center items-center text-xs p-2">
						{cartQuantity}
					</p>
				)}
			</div>
			{isOpen && (
				<div
					className={clsx(
						'absolute flex justify-between z-10 right-0 w-[300px] sm:w-[350px] bg-white border border-gray-300 shadow-md p-2',
						cartItems?.length === 0 ? 'flex-row' : 'flex-col'
					)}
				>
					{cartItems?.length === 0 && (
						<div className="flex mx-auto self-center">
							<p>No items in cart</p>
						</div>
					)}
					<div
						className="flex justify-end my-2 font-bold text-sm"
						onClick={closeCart}
					>
						<XMarkIcon width={24} />
					</div>
					{cartItems?.length !== 0 &&
						cartItems.map((item) => (
							<CartItem
								key={item.id}
								id={item.id}
								quantity={item.quantity}
								products={products}
							/>
						))}
					{cartItems?.length !== 0 && (
						<div className="border-b-2 ml-2 pb-4">
							<p className="text-right font-bold text-lg">
								Total: $
								{cartItems.reduce((total, cartItem) => {
									const item = products?.find(
										(item) => item._id === cartItem.id
									);
									return total + (item?.price || 0) * cartItem.quantity;
								}, 0)}
							</p>
						</div>
					)}
					{cartItems?.length > 0 && (
						<div className="h-12 flex justify-center items-center mt-2">
							<button
								className="mx-4 border-[2px] border-[black] h-[70%] w-full px-6 py-1"
								onClick={removeAllFromCart}
							>
								CLEAR
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
