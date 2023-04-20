import Image from 'next/image';
import { FC } from 'react';

// internal imports
import { RecommendedProducts } from 'components/RecommendedProducts/RecommendedProducts';
import { IFeaturedProduct } from 'common/contracts/product';
import { useShoppingCart } from 'context/ShoppingCartContext';

interface FeaturedProductProps {
	featuredProduct: IFeaturedProduct;
}

export const FeaturedProduct: FC<FeaturedProductProps> = ({
	featuredProduct,
}) => {
	const { increaseCartQuantity } = useShoppingCart();

	return (
		<div className="h-auto mx-2 md:mx-0 border-b-4 ">
			<div className="flex">
				<h2 className="font-bold py-4 text-3xl md:text-2xl capitalize">
					{featuredProduct.name}
				</h2>
				{/* Hide this div on small screens */}
				<div className="hidden ml-auto md:flex items-center">
					<button
						className="text-white px-4 py-1 bg-black "
						onClick={() => increaseCartQuantity(featuredProduct._id)}
					>
						ADD TO CART
					</button>
				</div>
			</div>
			{featuredProduct && (
				<div className="relative h-80 md:max-h-[50%] md:max-w-[100%]">
					<Image
						src={featuredProduct.image?.src}
						alt={featuredProduct.image?.alt}
						fill
						className="object-cover"
					/>
					<div className="absolute bg-[white] bottom-0 p-3">
						<p className="font-medium">Photo of the day</p>
					</div>
				</div>
			)}

			{/* Hide this div on medium+ screens */}
			<div
				className="flex bg-[black] text-white mt-4 items-center justify-center py-1 md:hidden"
				onClick={() => increaseCartQuantity(featuredProduct._id)}
			>
				<button>ADD TO CART</button>
			</div>

			<div className="flex flex-col md:flex-row mt-4 mb-10">
				<div className="mt-2 md:w-[40%] lg:w-[60%]">
					<h2 className="font-bold capitalize">{featuredProduct.name}</h2>
					<p className="font-medium mt-2 capitalize">
						{featuredProduct.category}
					</p>
					<p className="mt-2 text-sm">{featuredProduct.details.description}</p>
				</div>

				<div className="md:w-[40%] lg:w-[60%] md:ml-auto mt-2">
					<RecommendedProducts
						recommendedProducts={featuredProduct.details.recommendations}
					/>
				</div>
			</div>
		</div>
	);
};
