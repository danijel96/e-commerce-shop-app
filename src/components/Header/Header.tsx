import Link from 'next/link';
import { FC } from 'react';

// internal imports
import { ROUTES } from 'common/constants/routes';
import { ShoppingCart } from 'components/ShoppingCart/ShoppingCart';

export const Header: FC = () => {
	return (
		<header className="flex justify-between border-b-2 pb-4">
			<Link href={ROUTES.HOME}>Online Shop</Link>
			<ShoppingCart />
		</header>
	);
};
