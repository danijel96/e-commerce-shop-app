import Image from 'next/image';

// internal imports
import { Product } from 'common/contracts/product';
import { useShoppingCart } from 'context/ShoppingCartContext';

interface ProductItemProps {
	product: Product;
}

export const ProductItem = ({ product }: ProductItemProps) => {
	const { increaseCartQuantity } = useShoppingCart();

	return (
		<div className="mt-2 sm:mx-[initial] sm:mt-0 mb-7 xs:mb-2 sm:mb-0">
			<div className="relative group">
				{product.bestseller && (
					<p className="absolute bg-white text-sm px-2 font-[500]">
						Best seller
					</p>
				)}
				<Image
					src={product.image.src}
					alt={product.image.alt}
					className="w-full"
					width={800}
					height={120}
				/>
				<button
					onClick={() => increaseCartQuantity(product._id)}
					className="absolute bottom-0 left-0 w-full bg-[black] text-white opacity-100 py-2 sm:py-1 md:opacity-0 md:hover:opacity-100 md:hover:block md:hover:absolute md:hover:bottom-0 md:hover:left-0 md:hover:w-full md:hover:bg-[black] md:hover:text-white group-hover:opacity-100"
				>
					ADD TO CART
				</button>
			</div>
			<div className="text-center sm:text-left">
				<p className="capitalize text-[#656565] text-xl mt-1">
					{product.category}
				</p>
				<p className="font-bold mt-2 sm:mt-0 text-3xl sm:text-2xl lg:text-3xl truncate hover:text-clip">
					{product.name}{' '}
				</p>
				<p className="text-[#656565] mt-3 sm:mt-1">${product.price}</p>
			</div>
		</div>
	);
};
