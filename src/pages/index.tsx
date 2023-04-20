import { FunnelIcon } from '@heroicons/react/24/outline';
import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { useMedia } from 'react-use';

// internal imports
import {
	ProductsSortByEnum,
	SortOrderDirectionEnum,
} from 'common/constants/enums';
import { BREAKPOINTS } from 'common/constants/global.contants';
import { ProductsPayload } from 'common/contracts/api/payload/products.contracts';
import { PriceValues } from 'common/contracts/general.contracts';
import { IFeaturedProduct, Product } from 'common/contracts/product';
import { isDomainError } from 'common/services/api/config';
import {
	getAllProductsAPI,
	getFeaturedProductAPI,
} from 'common/services/api/product';
import { ErrorComponent } from 'components/Atoms/ErrorComponent';
import { SpinnerLoader } from 'components/Atoms/SpinnerLoader';
import { Drawer } from 'components/Drawer/Drawer';
import { Filters } from 'components/Filters/Filters';
import { Header } from 'components/Header/Header';
import { Pagination } from 'components/Pagination/Pagination';
import { FeaturedProduct } from 'components/Product/FeaturedProduct';
import { ProductList } from 'components/Product/ProductsList';
import { Sorter } from 'components/Sorter/Sorter';

interface IProducts {
	items: Product[];
	totalProducts: number;
}

const Home: NextPage = () => {
	const isMobile = useMedia(`(max-width: ${BREAKPOINTS.SM})`, true);

	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [products, setProducts] = useState<IProducts | undefined>(undefined);
	const [featuredProduct, setFeaturedProduct] = useState<
		IFeaturedProduct | undefined
	>(undefined);

	const [categories, setCategories] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<PriceValues>(0);

	const [sortBy, setSortBy] = useState(ProductsSortByEnum.PRICE);
	const [sortOrder, setSortOrder] = useState(SortOrderDirectionEnum.ASC);

	const getProducts = useCallback(async () => {
		const payload: ProductsPayload = {
			page: currentPage,
			limit: 6,
			category: categories,
			priceRange,
			sortOrder,
			sortBy,
		};
		const response = await getAllProductsAPI(payload);
		if (isDomainError(response)) {
			alert('Something went wrong. Try later!');
			setIsError(true);
			return;
		}

		setIsLoading(false);
		setProducts({
			items: response.products,
			totalProducts: response.totalProducts,
		});
		setCurrentPage(response.currentPage);
	}, [currentPage, categories, priceRange, sortOrder, sortBy]);

	const getFeaturedProduct = async () => {
		const response = await getFeaturedProductAPI();

		if (isDomainError(response)) {
			alert('Something went wrong. Try later!');
			setIsError(true);
			return;
		}
		setFeaturedProduct(response);
	};

	useEffect(() => {
		getProducts();
		getFeaturedProduct();
	}, [getProducts]);

	const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

	const toggleDrawer = () => {
		setIsOpenDrawer((prev) => !prev);
	};

	if (isError) {
		return <ErrorComponent />;
	}
	if (isLoading) {
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
					<FeaturedProduct featuredProduct={featuredProduct} />
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

				<div className="filter-products flex mx-3 md:m-0">
					{!isMobile && (
						<Filters
							categories={categories}
							setCategories={setCategories}
							priceRange={priceRange}
							setPriceRange={setPriceRange}
						/>
					)}
					{products && <ProductList products={products.items} />}
				</div>
				{products?.totalProducts ? (
					<Pagination
						className="pagination-bar mt-10"
						currentPage={currentPage || 1}
						totalCount={products.totalProducts}
						onPageChange={(p) => setCurrentPage(p)}
						pageSize={6}
					/>
				) : null}
			</main>
			<Drawer
				isOpen={isOpenDrawer}
				closeDrawer={toggleDrawer}
				title="Sorting & Filters"
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
			</Drawer>
		</div>
	);
};

export default Home;
