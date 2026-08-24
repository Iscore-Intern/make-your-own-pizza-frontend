import React from 'react';
import {useCart} from './useCart';
import MyCart from './Cart';
import './Cart.css'; 

export default function MyCartPage() {
    const myCartLogic = useCart();
    
    return <MyCart {...myCartLogic} />;
}