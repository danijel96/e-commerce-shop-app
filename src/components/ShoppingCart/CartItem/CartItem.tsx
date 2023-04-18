import Image from 'next/image';
import React from 'react';

interface CartItemProps {
	item: any;
}

const CartItem = ({ item }: CartItemProps) => {
	if (item == null) return null;

	return (
		<div
			key={item.id}
			className="flex mb-4 pb-2 ml-2 border-b-2"
		>
			<div className="w-1/2 flex flex-col items-start">
				<p className="font-bold capitalize">{'product?.name'}</p>
				<p>${'product?.price'}</p>
			</div>
			<div className="flex w-full justify-end mr-4">
				<Image
					src="https://picsum.photos/id/234/200/300
                    "
					alt={'product?.image.alt'}
					width={120}
					height={120}
					className="object-cover"
				/>
			</div>
		</div>
	);
};

export default CartItem;
