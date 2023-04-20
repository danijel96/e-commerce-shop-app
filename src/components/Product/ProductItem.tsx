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
		<div className="mt-2 md:mx-0 md:mt-0 mb-7 sm:mb-0">
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
					height={1}
				/>
				<button
					onClick={() => increaseCartQuantity(product._id)}
					className="absolute bottom-0 left-0 w-full bg-[black] text-white opacity-100 md:opacity-0 md:hover:opacity-100 md:hover:block md:hover:absolute md:hover:bottom-0 md:hover:left-0 md:hover:w-full md:hover:bg-[black] md:hover:text-white group-hover:opacity-100"
				>
					ADD TO CART
				</button>
			</div>
			<div>
				<p className="capitalize text-[#656565] text-xl mt-1">
					{product.category}
				</p>
				<p className="font-bold mt-2 text-3xl sm:text-2xl lg:text-3xl">
					{product.name}{' '}
				</p>
				<p className="text-[#656565] mt-3">${product.price}</p>
			</div>
		</div>
	);
};
