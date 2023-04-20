import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useMedia } from 'react-use';

// internal imports
import { BREAKPOINTS } from 'common/constants/global.contants';
import { Product } from 'common/contracts/product';
import { useShoppingCart } from 'context/ShoppingCartContext';

interface CartItemProps {
	id: string;
	quantity: number;
	products: Product[] | undefined;
}

export const CartItem = ({ id, quantity, products }: CartItemProps) => {
	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true);

	const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();

	const item = products?.find((product) => product._id === id);

	if (item == null) return null;

	return (
		<div
			key={id}
			className="flex mb-4 pb-2 ml-2 border-b-2 justify-between"
		>
			<div className="flex flex-col items-start justify-center">
				<p className="font-bold capitalize whitespace-nowrap">{item?.name}</p>
				<p className="my-2">${item?.price}</p>
				<div className="flex">
					<button
						className="bg-blue-400 p-1 rounded-md hover:bg-blue-500"
						onClick={(e) => {
							e.stopPropagation();
							decreaseCartQuantity(item._id);
						}}
					>
						<MinusIcon
							width={15}
							color="white"
						/>
					</button>
					<p className="w-7 text-center">{quantity}</p>
					<button
						className="bg-blue-400 p-1 rounded-md hover:bg-blue-500"
						onClick={(e) => {
							e.stopPropagation();
							increaseCartQuantity(item._id);
						}}
					>
						<PlusIcon
							width={15}
							color="white"
						/>
					</button>
				</div>
			</div>
			<div className="flex">
				<Image
					src={item.image.src}
					alt={item.image.alt}
					width={!isMobile ? 100 : 70}
					height={!isMobile ? 100 : 70}
					className="max-h-[90px] object-cover"
				/>
			</div>
		</div>
	);
};
