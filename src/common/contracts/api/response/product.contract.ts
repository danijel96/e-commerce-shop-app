import { AxiosResponse } from 'axios';
import { SWRResponse } from 'swr';

// internal imports
import { IFeaturedProduct, Product } from 'common/contracts/product';

export interface ProductsResponse {
	currentPage: number;
	products: Product[];
	totalPages: number;
	totalProducts: number;
}

export interface ProductsSWRResponse
	extends SWRResponse<AxiosResponse<ProductsResponse>> {}

export interface FeaturedProductSWRResponse
	extends SWRResponse<AxiosResponse<IFeaturedProduct[]>> {}
