import { useNavigate } from 'react-router-dom'; 
import CartItem from './CartItem';
import SpecialRequest from './SpecialRequest';
import PaymentSummary from './PaymentSummary';

export default function MyCart(props: any) {
  const navigate = useNavigate(); 

  return (
    <div className="cart-page-container"> 
      <div className="cart-header">
        
        <button 
          onClick={() => navigate(-1)}
        >
          <span className="text-xl">&larr;</span> Back
        </button>

        <div>
          <h2 className="text-red-color font-bold text-lg">Cart</h2>
          <h4 className="text-black-font font-bold text-3xl">My Cart</h4>
        </div>
      </div>

      <div className="cart-item-footer-container">
        <PaymentSummary />
      </div>


    </div>
  );
}