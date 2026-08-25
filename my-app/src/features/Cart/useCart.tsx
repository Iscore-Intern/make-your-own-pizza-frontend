import { useState } from 'react';
import CartItemType from '../../Core/Interfaces/Cart/CartItem.Interface';

export const useCart = () => {
  const [orders] = useState<CartItemType[]>([
    {
      orderId: '1',
      name: 'Margherita Pizza',
      description: 'Classic cheese and tomato sauce',
      orderPic: 'https://img.freepik.com/free-photo/isolated-pizza-with-mushrooms-olives_219193-8149.jpg',
      orderPrice: 150,
      orderQuantity: 2
    },
    {
      orderId: '2',
      name: 'Pepperoni Pizza',
      description: 'Extra pepperoni and mozzarella',
      orderPic: 'https://img.freepik.com/free-photo/isolated-pizza-with-mushrooms-olives_219193-8149.jpg',
      orderPrice: 200,
      orderQuantity: 1
    }
  ]);

  const [isLoading] = useState<boolean>(false);

  return {
    orders,
    isLoading
  };
};