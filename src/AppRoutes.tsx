import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  CollectionComponent,
  TaskList,
  ContactUs,
  SingleProduct,
  CartDrawer,
  CustomerAccount,
  Wishlist,
} from "./components";
import { Product } from "./types/types";

interface AppRoutesProps {
  cartItems: Product[];
  AddToCartDrawer: (product: Product) => void;
  removeFromCart: (productId: string) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  cartItems,
  AddToCartDrawer,
  removeFromCart,
}) => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/collections/catalog" element={<CollectionComponent />} />
      <Route path="/pages/task" element={<TaskList />} />
      <Route path="/pages/contact" element={<ContactUs />} />
      <Route
        path="/product/:handle"
        element={<SingleProduct AddToCartDrawer={AddToCartDrawer} />}
      />
      <Route
        path="/cart"
        element={
          <CartDrawer cartItems={cartItems} removeFromCart={removeFromCart} />
        }
      />
      <Route path="/account" element={<CustomerAccount />} />
      <Route path="/pages/wishlist" element={<Wishlist />} />
    </Routes>
  );
};

export default AppRoutes;
