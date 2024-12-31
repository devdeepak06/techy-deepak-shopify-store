import { CartItem } from "../types/types";

interface CartDrawerProps {
  cartItems: CartItem[];
  removeFromCart: (productId: string) => void;
}

const CartDrawer = ({ cartItems, removeFromCart }: CartDrawerProps) => {
  const totalPrice = cartItems.reduce((acc, item) => {
    const priceAmount = parseFloat(item.price?.amount || "0");
    return acc + priceAmount * item.quantity;
  }, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="flex justify-center flex-col  cart-drawer w-2/5 m-auto">
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex rounded border-2 m-2 cart-item">
              <img className="w-24" src={item.image?.url} alt={item.title} />
              <div className="px-4">
                <h4 className="font-bold">{item.title}</h4>
                <div>
                  <span>Rs. {item.price?.amount || "0"}</span>
                  {item.compareAtPrice?.amount && (
                    <span className="px-2 line-through text-gray-500">
                      Rs. {item.compareAtPrice?.amount}
                    </span>
                  )}
                </div>
                <p>Quantity: {item.quantity}</p>
                <button className="border-gray-100 my-2" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="total-items">
            <h4>Total Items: {totalItems}</h4>
          </div>
          <div className="total-price">
            <h4>Total: Rs. {totalPrice.toFixed(2)}</h4>{" "}
          </div>
        </>
      )}
    </div>
  );
};

export default CartDrawer;
