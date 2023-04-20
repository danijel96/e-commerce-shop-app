import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

// internal imports
import { PriceValues } from 'common/contracts/general.contracts';
import { categoriesData, priceRangeData } from 'common/utils/filters.data';
import { CustomCheckbox } from 'components/Atoms/CustomCheckbox';

interface FiltersProps {
	categories: string[];
	setCategories: Dispatch<SetStateAction<string[]>>;
	priceRange: PriceValues;
	setPriceRange: Dispatch<SetStateAction<PriceValues>>;
}
export const Filters: FC<FiltersProps> = ({
	categories,
	setCategories,
	priceRange,
	setPriceRange,
}) => {
	const ifCategoryChecked = (value: string) => {
		const findCategory = categories.find((item) => item === value);
		if (!findCategory) {
			return false;
		}
		return true;
	};

	const handleCategories = (event: ChangeEvent<HTMLInputElement>) => {
		const clickedCategory = event.target.value;
		console.log(clickedCategory, 'clickedCategory');

		const categoryChecked = ifCategoryChecked(event.target.value);

		if (!categoryChecked) {
			addCategory(clickedCategory);
			return;
		}
		removeCategory(clickedCategory);
	};

	const addCategory = (category: string) => {
		setCategories([...categories, category]);
	};

	const removeCategory = (category: string) => {
		const filteredCategories = categories.filter((item) => item !== category);
		setCategories(filteredCategories);
	};

	const ifPriceRangeChecked = (value: number) => {
		if (priceRange !== value) {
			return false;
		}
		return true;
	};

	const handlePriceRange = (event: ChangeEvent<HTMLInputElement>) => {
		const clickedPriceRange = +event.target.value as PriceValues;
		if (+clickedPriceRange === priceRange) {
			setPriceRange(0);
			return;
		}
		setPriceRange(clickedPriceRange);
	};

	return (
		<div className="hidden w-[25%] md:flex flex-col ml-2">
			<h2 className="font-medium mb-4">Category</h2>
			{categoriesData.map((category) => (
				<div
					className="mb-3 capitalize"
					key={category.value}
				>
					<CustomCheckbox
						id={category.value}
						label={category.label}
						value={category.value}
						checked={ifCategoryChecked(category.value)}
						onChange={handleCategories}
					/>
				</div>
			))}
			<div className="h-[1px] bg-[#C2C2C2] my-8"></div>

			<h2 className="font-medium mb-4">Price range</h2>
			{priceRangeData.map((price) => (
				<div
					className="mb-3"
					key={price.value}
				>
					<CustomCheckbox
						id={price.value.toString()}
						label={price.label}
						value={price.value}
						checked={ifPriceRangeChecked(price.value)}
						onChange={handlePriceRange}
					/>
				</div>
			))}
		</div>
	);
};
