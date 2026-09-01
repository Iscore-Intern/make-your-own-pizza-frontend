import CartItemType from '../../Core/Interfaces/Cart/CartItem.Interface';
import CartItemProps from '../../Core/Interfaces/Cart/CartItemProps.Interface';


export default function CartItem({ itemDetails }: CartItemProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center bg-white-color p-5 rounded-2xl shadow-sm border border-beige-dark">
        
        <div className="flex items-center gap-5">
          <img src={itemDetails.orderPic} alt={itemDetails.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold text-black-font">{itemDetails.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex justify-center items-center rounded-full bg-beige-color hover:bg-beige-dark text-black-font font-bold transition-colors">-</button>
            <span className="text-lg font-bold text-black-font">{itemDetails.orderQuantity}</span>
            <button className="w-8 h-8 flex justify-center items-center rounded-full bg-beige-color hover:bg-beige-dark text-black-font font-bold transition-colors">+</button>
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-base font-bold text-black-font">EGP {itemDetails.orderPrice}</p>
          <button className="text-xs font-medium text-red-color bg-beige-color px-2 py-1 rounded-md hover:bg-beige-dark transition-colors">
            Remove
          </button>
        </div>

      </div>
    </div>
  );
}