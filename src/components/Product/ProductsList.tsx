// internal imports
import { ProductItem } from './ProductItem';
import { Product } from 'common/contracts/product';

interface ProductListProps {
	products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
	return (
		<div className="w-full xs:grid xs:grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 sm:gap-x-2 sm:w-[70%] sm:ml-auto">
			{products &&
				products?.map((product) => (
					<ProductItem
						key={product.name}
						product={product}
					/>
				))}
		</div>
	);
};
