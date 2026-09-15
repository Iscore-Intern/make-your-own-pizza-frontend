import { useNavigate } from 'react-router-dom'; 
import PaymentSummary from './PaymentSummary';

interface MyCartProps {
  orders?: any[];
  isLoading?: boolean;
}

export default function MyCart(_props: MyCartProps) {
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