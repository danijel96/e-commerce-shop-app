import {
	SortOrderDirectionEnum,
	ProductsSortByEnum,
} from 'common/constants/enums';
import { PriceValues } from 'common/contracts/general.contracts';

export interface ProductsPayload {
	page?: number;
	limit?: number;
	category?: string[];
	priceRange?: PriceValues;
	sortBy?: ProductsSortByEnum;
	sortOrder?: SortOrderDirectionEnum;
}
