import Image from 'next/image';
// internal imports
import { ProductRecommendations } from 'common/contracts/product';

interface RecommendedProductsProps {
	recommendedProducts: ProductRecommendations[];
}

const RecommendedProducts = ({
	recommendedProducts,
}: RecommendedProductsProps) => {
	return (
		<div className=" flex flex-col mb-4 w-full">
			<h2 className="font-bold md:ml-auto mb-2">People also buy</h2>
			<div className="flex justify-between md:justify-end md:ml-4 ">
				{recommendedProducts &&
					recommendedProducts.map((product, index) => (
						<Image
							key={index}
							width={150}
							height={125}
							src={product.src}
							alt={product.alt}
							className="md:ml-10 w-[25%]"
						/>
					))}
			</div>
			<div className="flex flex-col md:items-end mt-2 text-xs">
				<h2 className="font-bold mb-4">Details</h2>
				<p>Size: 1020x 1020 pixel</p>
				<p>Size: 15mb</p>
			</div>
		</div>
	);
};

export default RecommendedProducts;
