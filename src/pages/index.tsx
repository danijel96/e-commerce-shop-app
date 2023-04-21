import { FunnelIcon } from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useMedia } from 'react-use';

// internal imports
import {
	ProductsSortByEnum,
	SortOrderDirectionEnum,
} from 'common/constants/enums';
import { BREAKPOINTS } from 'common/constants/global.contants';
import { PriceValues } from 'common/contracts/general.contracts';
import {
	useAllProductsAPI,
	useFeaturedProductAPI,
} from 'common/services/api/hooks/products.hook';
import { ErrorComponent } from 'components/Atoms/ErrorComponent';
import { SpinnerLoader } from 'components/Atoms/SpinnerLoader';
import { Drawer } from 'components/Drawer/Drawer';
import { Filters } from 'components/Filters/Filters';
import { Header } from 'components/Header/Header';
import { Pagination } from 'components/Pagination/Pagination';
import { FeaturedProduct } from 'components/Product/FeaturedProduct';
import { ProductList } from 'components/Product/ProductsList';
import { Sorter } from 'components/Sorter/Sorter';
import FiltersButtons from 'components/Filters/FiltersButtons';
import Footer from 'components/Footer/Footer';

const Home: NextPage = () => {
	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true); // true is defaultState parameter for ssr to avoid hydration error

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [categories, setCategories] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<PriceValues>(0);

	const [sortBy, setSortBy] = useState(ProductsSortByEnum.PRICE);
	const [sortOrder, setSortOrder] = useState(SortOrderDirectionEnum.ASC);

	const {
		data: featuredProduct,
		error: featuredError,
		isLoading: featuredIsLoading,
	} = useFeaturedProductAPI();

	const {
		data: productsData,
		error,
		isLoading,
	} = useAllProductsAPI({
		page: currentPage,
		limit: 6,
		category: categories,
		priceRange,
		sortOrder,
		sortBy,
	});

	const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

	const toggleDrawer = () => {
		setIsOpenDrawer((prev) => !prev);
	};

	const handleClearFilters = () => {
		setPriceRange(0);
		setCategories([]);
	};

	const handleNoResults = () => {
		let results = 'No products';
		if (categories.length !== 0) {
			results = 'No products based on your search. Change filters and try again!';
		}
		return results;
	};

	if (error) {
		return <ErrorComponent />;
	}
	if (isLoading && featuredIsLoading) {
		return <SpinnerLoader />;
	}

	return (
		<div className="products-page min-h-screen max-w-4xl min-w-[320px] bg-white p-5 mx-auto">
			<Head>
				<title>Products</title>
			</Head>
			<Header />
			<main>
				{featuredProduct && (
					<FeaturedProduct featuredProduct={featuredProduct?.data[0]} />
				)}
				<div className="relative flex items-center justify-between mx-2 md:mx-0 my-8">
					<h2>
						<b>Photography /</b> Premium Photos
					</h2>
					{isMobile && (
						<button
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
							onClick={toggleDrawer}
						>
							<span>Filters</span>
							<FunnelIcon
								width={24}
								className="ml-2"
							/>
						</button>
					)}
					{!isMobile && (
						<Sorter
							sortBy={sortBy}
							setSortBy={setSortBy}
							sortOrder={sortOrder}
							setSortOrder={setSortOrder}
						/>
					)}
				</div>

				<div className="relative filter-products flex mx-3 md:m-0">
					{!isMobile && (
						<Filters
							categories={categories}
							setCategories={setCategories}
							priceRange={priceRange}
							setPriceRange={setPriceRange}
						/>
					)}
					{isLoading && <SpinnerLoader component />}
					{productsData?.data.products.length ? (
						<ProductList products={productsData?.data.products} />
					) : (
						<div className="grow flex justify-center items-center min-h-[200px] mx-5">
							<p className="text-lg text-center">{handleNoResults()}</p>
						</div>
					)}
				</div>
				{productsData?.data.totalProducts ? (
					<Pagination
						className="pagination-bar mt-10"
						currentPage={currentPage || 1}
						totalCount={productsData?.data.totalProducts}
						onPageChange={(p) => setCurrentPage(p)}
						pageSize={6}
					/>
				) : null}
			</main>
			<Drawer
				isOpen={isOpenDrawer}
				closeDrawer={toggleDrawer}
				title="Sorting & Filters"
				childrenClassName="pb-10"
				titleIcon={
					<FunnelIcon
						color="black"
						width={20}
					/>
				}
			>
				<Sorter
					sortBy={sortBy}
					setSortBy={setSortBy}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
				/>
				<div className="h-[1px] bg-[#C2C2C2] my-8" />
				<Filters
					categories={categories}
					setCategories={setCategories}
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					closeDrawer={toggleDrawer}
				/>
				{isMobile && (
					<div className="flex justify-center items-center  whitespace-nowrap bg-white fixed left-0 bottom-0 w-full py-2">
						<FiltersButtons
							closeDrawer={toggleDrawer}
							handleClearFilters={handleClearFilters}
						/>
					</div>
				)}
			</Drawer>
			<Footer />
		</div>
	);
};

export default Home;
