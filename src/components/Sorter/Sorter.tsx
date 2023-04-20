import {
	ArrowDownIcon,
	ArrowUpIcon,
	ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { Dispatch, FC, SetStateAction, useState } from 'react';

// internal imports
import {
	ProductsSortByEnum,
	SortOrderDirectionEnum,
} from 'common/constants/enums';

interface SorterProps {
	sortBy: ProductsSortByEnum;
	setSortBy: Dispatch<SetStateAction<ProductsSortByEnum>>;
	sortOrder: SortOrderDirectionEnum;
	setSortOrder: Dispatch<SetStateAction<SortOrderDirectionEnum>>;
}

export const Sorter: FC<SorterProps> = ({
	sortBy,
	setSortBy,
	sortOrder,
	setSortOrder,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative flex flex-col sm:flex-row ml-2 sm:ml-0">
			<p className="whitespace-nowrap font-semibold mb-2 sm:mb-0">Sort by</p>
			<div className="flex">
				<div
					className="flex items-center cursor-pointer"
					onClick={() => setIsOpen(!isOpen)}
				>
					<p className="ml-2 capitalize w-12">{sortBy}</p>
					<p className="flex items-center justify-center w-full h-full">
						<ChevronDownIcon
							width={15}
							height={20}
							className="flex items-center justify-center"
						/>
					</p>
					{isOpen && (
						<div className="absolute z-10 top-0 sm:top-full right-0 w-[100px] bg-white border border-gray-300 shadow-md">
							{Object.values(ProductsSortByEnum).map((option) => (
								<div
									key={option}
									className="p-2 hover:bg-gray-200 cursor-pointer"
									onClick={() => setSortBy(option)}
								>
									{option}
								</div>
							))}
						</div>
					)}
				</div>
				<div className="flex items-center cursor-pointer ">
					{sortOrder === SortOrderDirectionEnum.ASC ? (
						<span
							className="flex text-xs"
							onClick={() => setSortOrder(SortOrderDirectionEnum.DESC)}
						>
							ASC
							<ArrowUpIcon
								width={13}
								className="mr-1"
							/>
						</span>
					) : (
						<span
							className="flex text-xs"
							onClick={() => setSortOrder(SortOrderDirectionEnum.ASC)}
						>
							DESC
							<ArrowDownIcon
								width={13}
								className="mr-1"
							/>
						</span>
					)}
				</div>
			</div>
		</div>
	);
};
