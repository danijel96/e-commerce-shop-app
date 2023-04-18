import {
	SortOrderDirectionEnum,
	ProductsSortByEnum,
} from 'common/constants/enums';

export interface ProductsPayload {
	page?: number;
	limit?: number;
	category?: string[];
	priceRange?: number;
	sortBy?: ProductsSortByEnum;
	sortOrder?: SortOrderDirectionEnum;
}
