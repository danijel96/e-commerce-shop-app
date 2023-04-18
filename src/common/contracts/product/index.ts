export interface Product {
	_id: string;
	name: string;
	category: string;
	price: number;
	currency: string;
	image: ProductImage;
	bestseller: boolean;
	featured: boolean;
}

export interface ProductImage {
	src: string;
	alt: string;
}

export interface IFeaturedProduct extends Product {
	details: ProductDetails;
}

export interface ProductDetails {
	dimmensions: {
		width: number;
		height: number;
	};
	size: number;
	description: string;
	recommendations: ProductRecommendations[];
}

export interface ProductRecommendations extends ProductImage {}
