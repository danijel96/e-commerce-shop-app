// internal imports
import ProductItem from './ProductItem';
import { Product } from 'common/contracts/product';

interface ProductListProps {
	products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
	return (
		<div className="w-full h-auto sm:grid sm:grid-cols-3 gap-2 sm:w-[70%] sm:ml-auto">
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
