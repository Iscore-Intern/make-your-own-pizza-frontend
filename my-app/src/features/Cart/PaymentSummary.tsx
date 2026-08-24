// متنساش تراجع مسار الـ Button الصح
import Button from '../../Shared/Components/Button'; 

export default function PaymentSummary() {
  const subtotal = 350;
  const deliveryFee = 20;
  const total = subtotal + deliveryFee;

  return (
    <div className="w-full mt-4">
      <div className="bg-white-color p-6 rounded-2xl shadow-sm border border-beige-dark">
        <h3 className="text-lg font-bold text-black-font mb-4">Payment Summary</h3>
        
        <div className="flex flex-col gap-3 text-sm font-semibold text-sub-color">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>EGP {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>EGP {deliveryFee}</span>
          </div>
        </div>
        
        <div className="flex justify-between mt-4 pt-4 border-t border-beige-dark text-lg font-bold text-black-font">
          <span>Total</span>
          <span>EGP {total}</span>
        </div>
        
        <div className="mt-6 flex gap-4">
          <Button>Add Item</Button>
          <Button>Checkout</Button>
        </div>
      </div>
    </div>
  );
}