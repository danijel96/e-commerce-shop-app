import Image from 'next/image';

// internal imports
import { Product } from 'common/contracts/product';
import { useShoppingCart } from 'context/ShoppingCartContext';

interface ProductItemProps {
	product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
	const { increaseCartQuantity } = useShoppingCart();

	return (
		<div className="mt-2 mx-2 md:mx-0 md:mt-0">
			<div className="relative">
				{product.bestseller && (
					<p className="absolute bg-white text-sm px-2 font-[500]">
						Best seller
					</p>
				)}
				<Image
					src={product.image.src}
					alt={product.image.alt}
					className="object-scale-down w-full"
					width={800}
					height={1}
				/>
				<button
					onClick={() => increaseCartQuantity(product._id)}
					className="absolute bottom-0 left-0 w-full bg-[black] text-white opacity-100 md:opacity-0 md:hover:opacity-100 md:hover:block md:hover:absolute md:hover:bottom-0 md:hover:left-0 md:hover:w-full md:hover:bg-[black] md:hover:text-white "
				>
					ADD TO CART
				</button>
				<style jsx>{`
					div:hover > button {
						opacity: 100;
					}
				`}</style>
			</div>
			<div>
				<p className="capitalize">{product.category}</p>
				<p className="font-bold">{product.name} </p>
				<p>{product.price}</p>
			</div>
		</div>
	);
};

export default ProductItem;
