import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FC, useState } from 'react';

// internal imports
import { ROUTES } from 'common/constants/routes';
import ShoppingCart from 'components/ShoppingCart/ShoppingCart';

export const Header: FC = () => {
	const [shopIsOpen, setShopIsOpen] = useState(false);

	return (
		<header className="flex justify-between border-b-2 pb-3">
			<Link href={ROUTES.HOME}>Online Shop</Link>
			{/*<ShoppingCartIcon
				width={20}
				onClick={() => setShopIsOpen(true)}
			/>*/}
			<ShoppingCart />
			{/*{shopIsOpen && <ShoppingCart />}*/}
		</header>
	);
};
