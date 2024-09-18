// src/types/shopify.d.ts
export interface PriceV2 {
  amount: string;
  currencyCode: string;
}

export interface Variant {
  id: string;
  title: string;
  priceV2: PriceV2;
}

export interface Image {
  src: string;
  altText: string | null;
}

export interface Product {
  id: string;
  title: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  handle: string;
  createdAt: string;
  updatedAt: string;
  variants: {
    edges: {
      node: Variant;
    }[];
  };
  images: {
    edges: {
      node: Image;
    }[];
  };
}

export interface ProductsResponse {
  products: {
    edges: {
      node: Product;
    }[];
  };
}
