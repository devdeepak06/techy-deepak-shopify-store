// src/types/shopify.d.ts
export interface ImageNode {
  altText: string | null;
  id: string;
  url: string;
}

export interface VariantNode {
  compareAtPrice: {
    amount: string | null;
    currencyCode: string | null;
  } | null;
  image: ImageNode | null;
  id: string;
  price: {
    amount: string | null;
    currencyCode: string | null;
  } | null;
  sku: string | null;
  title: string;
  weight: number | null;
  weightUnit: string | null;
  taxable: boolean;
  requiresShipping: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  unitPriceMeasurement: {
    quantityValue: number | null;
    referenceUnit: string | null;
    referenceValue: number | null;
    quantityUnit: string | null;
    measuredType: string | null;
  } | null;
  unitPrice: {
    amount: string | null;
    currencyCode: string | null;
  } | null;
}

export interface ProductNode {
  id: string;
  title: string;
  handle: string;
  createdAt: string;
  description: string | null;
  descriptionHtml: string | null;
  images: {
    nodes: ImageNode[];
  };
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
  productType: string | null;
  publishedAt: string | null;
  tags: string[];
  updatedAt: string;
  vendor: string | null;
  variants: {
    nodes: VariantNode[];
  };
}

export interface AllProductsData {
  products: {
    nodes: ProductNode[];
  };
}
