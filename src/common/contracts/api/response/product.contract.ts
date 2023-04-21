import { AxiosResponse } from 'axios';
import { IFeaturedProduct, Product } from 'common/contracts/product';
import { SWRResponse } from 'swr';

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
