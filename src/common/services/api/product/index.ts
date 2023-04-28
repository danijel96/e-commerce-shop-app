import { API_ENDPOINTS } from 'common/constants/api.constants';
import { ProductsPayload } from 'common/contracts/api/payload/products.contracts';
import { ProductsResponse } from 'common/contracts/api/response/product.contract';
import { IFeaturedProduct } from 'common/contracts/product';
import { APIError } from 'common/models/response/api/api-error.model';
import { extractMinMaxPriceRanges } from 'common/utils/api.helpers';
import { api, buildDomainError } from '../config';

/**
 * Send a GET API request to get all products.
 * @param {Object | undefined} payload - ProductsPayload or undefined
 * @returns Product array or API error.
 */
export const getAllProductsAPI = async (
	payload?: ProductsPayload
): Promise<ProductsResponse | APIError> => {
	try {
		const params = {
			page: payload?.page || null,
			limit: payload?.limit || null,
			category: payload?.category || null,
			priceMin: payload?.priceRange
				? extractMinMaxPriceRanges(payload?.priceRange).priceMin
				: null,
			priceMax: payload?.priceRange
				? extractMinMaxPriceRanges(payload?.priceRange).priceMax
				: null,
			sortOrder: payload?.sortOrder || null,
			sortBy: payload?.sortBy || null,
		};
		const response = await api.get(API_ENDPOINTS.PRODUCTS.INDEX, {
			params,
		});
		const data = response.data as ProductsResponse;
		return data;
	} catch (error) {
		return buildDomainError(error);
	}
};

/**
 * Send a GET API request to get one featured product.
 * @returns IFeaturedProduct or API error.
 */
export const getFeaturedProductAPI = async (): Promise<
	IFeaturedProduct | APIError
> => {
	try {
		const response = await api.get(API_ENDPOINTS.PRODUCTS.FEATURED);
		const data = response.data[0] as IFeaturedProduct;
		return data;
	} catch (error) {
		return buildDomainError(error);
	}
};
