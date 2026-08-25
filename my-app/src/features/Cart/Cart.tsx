import { useNavigate } from 'react-router-dom'; 
import CartItem from './CartItem';
import SpecialRequest from './SpecialRequest';
import PaymentSummary from './PaymentSummary';

export default function MyCart(props: any) {
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-beige-color pt-24 pb-12"> 
      <div className="max-w-3xl mx-auto p-6 flex flex-col gap-4">
        
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-black-font font-bold hover:text-red-color transition-colors w-fit mb-2"
        >
          <span className="text-xl">&larr;</span> Back
        </button>

        <div>
          <h2 className="text-red-color font-bold text-lg">Cart</h2>
          <h4 className="text-black-font font-bold text-3xl">My Cart</h4>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          {props.orders && props.orders.map((item: any) => (
            <CartItem key={item.orderId} itemDetails={item} />
          ))}
        </div>

        <SpecialRequest />
        
        <PaymentSummary />

      </div>
    </div>
  );
}