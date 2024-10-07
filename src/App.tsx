import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import AppRoutes from "./AppRoutes";
import { Product } from "./types/types";

function App() {
  // Initialize cart items from localStorage
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Update total items in cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Add to cart functionality
  const AddToCartDrawer = (product: Product) => {
    setCartItems((prevItems: Product[]) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += product.quantity;
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        const updatedItems = [...prevItems, product];
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      }
    });
  };

  // Remove from cart functionality
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems: Product[]) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <Router>
      <>
        <Header totalItems={totalItems} />
        <AppRoutes
          cartItems={cartItems}
          AddToCartDrawer={AddToCartDrawer}
          removeFromCart={removeFromCart}
        />
      </>
    </Router>
  );
}

export default App;
