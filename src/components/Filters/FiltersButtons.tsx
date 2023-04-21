import { useMedia } from 'react-use';

// internal imports
import { BREAKPOINTS } from 'common/constants/global.contants';
import { FC } from 'react';

interface FiltersButtonsProps {
	closeDrawer?: () => void;
	handleClearFilters?: () => void;
}

const FiltersButtons: FC<FiltersButtonsProps> = ({
	closeDrawer,
	handleClearFilters,
}) => {
	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true);

	return (
		<>
			<button
				className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-0 sm:mt-5"
				onClick={handleClearFilters}
			>
				Clear Filters
			</button>
			{isMobile && (
				<button
					className="btn btn-blue ml-5"
					onClick={closeDrawer}
				>
					Show results
				</button>
			)}
		</>
	);
};

export default FiltersButtons;
