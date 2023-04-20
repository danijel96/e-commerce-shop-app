import { PriceRange, PriceValues } from 'common/contracts/general.contracts';

/**
 * Extract price min & max from provided price range value.
 * @param {number} value - Choosen value from given price ranges
 * @returns priceRange object.
 */
export const extractMinMaxPriceRanges = (value: PriceValues) => {
	let priceRange: PriceRange = { priceMin: null, priceMax: null };

	switch (value) {
		case 1:
			priceRange.priceMax = 20;
			break;
		case 2:
			priceRange.priceMin = 21;
			priceRange.priceMax = 100;
			break;
		case 3:
			priceRange.priceMin = 101;
			priceRange.priceMax = 200;
			break;
		case 4:
			priceRange.priceMin = 201;
			priceRange.priceMax = null;
			break;
		default:
			priceRange;
			break;
	}

	return priceRange;
};
