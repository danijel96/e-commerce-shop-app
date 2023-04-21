import { AxiosResponse } from 'axios';
import useSWR from 'swr';

// internal imports
import { API_ENDPOINTS } from 'common/constants/api.constants';
import { ProductsPayload } from 'common/contracts/api/payload/products.contracts';
import {
	FeaturedProductSWRResponse,
	ProductsResponse,
	ProductsSWRResponse,
} from 'common/contracts/api/response/product.contract';
import { APIError } from 'common/models/response/api/api-error.model';
import { buildRoute, fetcher } from '../config';
import { IFeaturedProduct } from 'common/contracts/product';
import { extractMinMaxPriceRanges } from 'common/utils/api.helpers';

/**
 * Sends GET api request to fetch paginated products.
 * @param {Object} payload - ProductsPayload for pagination, filters and sorters.
 * @returns ProductsSWRResponse
 */
export const useAllProductsAPI = (
	payload: ProductsPayload
): ProductsSWRResponse => {
	const { priceMin = null, priceMax = null } = payload.priceRange
		? extractMinMaxPriceRanges(payload.priceRange)
		: {};

	const response = useSWR<AxiosResponse<ProductsResponse>, APIError>(
		buildRoute(API_ENDPOINTS.PRODUCTS.INDEX, {
			...payload,
			priceMin,
			priceMax,
		}),
		fetcher,
		{ keepPreviousData: true }
	);

	return response;
};

/**
 * Sends GET api request to fetch featured product.
 * @returns FeaturedProductSWRResponse
 */
export const useFeaturedProductAPI = (): FeaturedProductSWRResponse => {
	const response = useSWR<AxiosResponse<IFeaturedProduct[]>, APIError>(
		API_ENDPOINTS.PRODUCTS.FEATURED,
		fetcher
	);

	return response;
};
