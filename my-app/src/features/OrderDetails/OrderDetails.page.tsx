// import { useOrderDetails } from "./useOrderDetails";
import OrderDetails from "./OrderDetails";
import { OrderDetailsData } from "./orderinfo";

export default function OrderDetailsPage() {
    // const { order, isLoading, error } = useOrderDetails();
    const mockOrder: OrderDetailsData = {
        orderId: "100",
        totalPrice: 190,
        paymentMethod: 2,
        customerPhone: "01008052461",
        status: "Delivered",
        createdAt: "2026-08-04T13:10:00+00:00",
        pizzas: [
            {
                pizzaId: "1111",
                pizzaName: "Custom Pizza",
                price: 190,
                ingredients: [
                    { ingredientId: "1", ingredientName: "Extra Cheese", quantity: 1 },
                    { ingredientId: "2", ingredientName: "Black Olives", quantity: 1 }
                ]
            }
        ]
    };
    // if (isLoading) {
    //     return <p className="text-center text-gray-500 mt-40 font-bold">Loading order details...</p>;
    // }

    // if (error) {
    //     return <p className="text-center text-red-500 mt-40 font-bold">{error}</p>;
    // }

    // if (!order) {
    //     return <p className="text-center text-gray-500 mt-40 font-bold">Order not found</p>;
    // }

    return (
        <OrderDetails order={mockOrder} />
    );
}