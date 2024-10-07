// types.ts
export interface ImageNode {
  id: string;
  url: string;
}
export interface Product {
  id: string;
  title: string;
  price: {
    amount: string | null;
    currencyCode: string | null;
  } | null;
  quantity: number;
  compareAtPrice: {
    amount: string | null;
    currencyCode: string | null;
  } | null;
  image: ImageNode | null;
}
export interface CartItem {
  id: string;
  title: string;
  price: {
    amount: string | null;
    currencyCode: string | null;
  } | null;
  quantity: number;
  compareAtPrice: {
    amount: string | null;
    currencyCode: string | null;
  } | null;
  image: ImageNode | null;
}
