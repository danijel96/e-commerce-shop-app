import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';

// internal imports
//import { products } from "db"
import { ProductsSortByEnum, SortOrderDirectionEnum } from 'common/constants/enums';
import { ProductsPayload } from 'common/contracts/api/payload/products.contracts';
import { IFeaturedProduct, Product } from 'common/contracts/product';
import { isDomainError } from 'common/services/api/config';
import {
    getAllProductsAPI,
    getFeaturedProductAPI,
} from 'common/services/api/product';
import { ErrorComponent } from 'components/Atoms/ErrorComponent';
import { SpinnerLoader } from 'components/Atoms/SpinnerLoader';
import { Filters } from 'components/Filters/Filters';
import { Header } from 'components/Header/Header';
import { Pagination } from 'components/Pagination';
import { FeaturedProduct } from 'components/Product/FeaturedProduct';
import ProductList from 'components/Product/ProductsList';
import { Sorter } from 'components/Sorter/Sorter';

interface IProducts {
	items: Product[];
	totalProducts: number;
}

const Home: NextPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [products, setProducts] = useState<IProducts | undefined>(undefined);
	const [featuredProduct, setFeaturedProduct] = useState<
		IFeaturedProduct | undefined
	>(undefined);

	const [categories, setCategories] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<number>(0);

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

	if (isError) {
		return <ErrorComponent />;
	}
	if (isLoading) {
		return <SpinnerLoader />;
	}

	return (
		<div className="min-h-screen max-w-2xl bg-white p-5 mx-auto">
			<Header />
			<main>
				{featuredProduct && (
					<FeaturedProduct featuredProduct={featuredProduct} />
				)}
				<Sorter
					sortBy={sortBy}
					setSortBy={setSortBy}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
				/>
				<div className="flex">
					<Filters
						categories={categories}
						setCategories={setCategories}
						priceRange={priceRange}
						setPriceRange={setPriceRange}
					/>
					{products && <ProductList products={products.items} />}
				</div>
				{products?.totalProducts ? (
					<Pagination
						className="pagination-bar"
						currentPage={currentPage || 1}
						totalCount={products.totalProducts}
						onPageChange={(p) => setCurrentPage(p)}
						pageSize={6}
					/>
				) : null}
			</main>
		</div>
	);
};

export default Home;
