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
    <div className="cart-drawer w-2/5">
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image?.url} alt={item.title} />
              <div>
                <h4 className="font-bold">{item.title}</h4>
                <p>Rs. {item.price?.amount || "0"}</p>
                {item.compareAtPrice?.amount && (
                  <p className="line-through text-gray-500">
                    Rs. {item.compareAtPrice?.amount}
                  </p>
                )}
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
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
