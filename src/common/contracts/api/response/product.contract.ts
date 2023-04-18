import { Product } from 'common/contracts/product';

export interface ProductsResponse {
	currentPage: number;
	products: Product[];
	totalPages: number;
	totalProducts: number;
}
