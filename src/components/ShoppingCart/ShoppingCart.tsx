import { useShoppingCart } from 'context/ShoppingCartContext';
import CartItem from './CartItem/CartItem';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import clsx from 'clsx';

const ShoppingCart = () => {
	const {
		cartQuantity,
		cartItems,
		removeAllFromCart,
		openCart,
		closeCart,
		isOpen,
		setIsOpen,
	} = useShoppingCart();

	const [shopIsOpen, setShopIsOpen] = useState(false);

	return (
		<div className="relative w-10 cursor-pointer">
			{/* <div onClick={() => setIsOpen(!isOpen)}> */}
			<div onClick={() => setShopIsOpen(!shopIsOpen)}>
				<ShoppingCartIcon width={25} />
				{cartQuantity > 0 && (
					<p className="absolute bottom-0 right-[15px] w-3 h-3 translate-y-2/3 translate-x-2/3 bg-[black] text-white flex justify-center items-center text-xs p-2">
						{cartQuantity}
					</p>
				)}
			</div>
			{shopIsOpen && (
				<div
					className={clsx(
						'absolute flex justify-between items-center z-10 right-0 w-[300px] bg-white border border-gray-300 shadow-md',
						cartItems?.length === 0 ? 'flex-row' : 'flex-col'
					)}
				>
					{cartItems?.length === 0 && (
						<div className="flex mx-auto self-center">
							<p>No items in cart</p>
						</div>
					)}
					<div
						className="flex justify-end mr-4 mt-2 mb-4 font-bold text-sm"
						// onClick={() => setIsOpen(false)}
						onClick={closeCart}
					>
						X
					</div>
					{cartItems?.length !== 0 &&
						cartItems.map((item) => (
							<CartItem
								key={item.id}
								item={item}
							/>
						))}
					{cartItems?.length > 0 && (
						<div className="h-12 flex justify-center items-center">
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

export default ShoppingCart;
