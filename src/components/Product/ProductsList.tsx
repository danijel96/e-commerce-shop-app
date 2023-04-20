// internal imports
import ProductItem from './ProductItem';
import { Product } from 'common/contracts/product';

interface ProductListProps {
	products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
	return (
		<div className="w-full  h-auto md:grid md:grid-cols-3 gap-2 md:w-[70%] md:ml-auto">
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
