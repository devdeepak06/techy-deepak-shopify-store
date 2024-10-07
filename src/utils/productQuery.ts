//Define your GraphQL queries based on the data you need
export const allProductsQuery = `
query getProducts {
  products(first: 100) {
    nodes {
      id
      title
      handle
      createdAt
      description
      descriptionHtml
      images(first: 10) {
        nodes {
          altText
          id
          url
        }
      }
      options(first: 10) {
        id
        name
        optionValues {
          id
          name
        }
      }
      productType
      publishedAt
      tags
      updatedAt
      vendor
      variants(first: 10) {
        nodes {
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            altText
            height
            id
            url
          }
          id
          price {
            amount
            currencyCode
          }
          sku
          title
          weight
          weightUnit
          taxable
          requiresShipping
          selectedOptions {
            name
            value
          }
          unitPriceMeasurement {
            quantityValue
            referenceUnit
            referenceValue
            quantityUnit
            measuredType
          }
          unitPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`;

export const singleProductQuery = `
  query ProductQuery($handle: String) {
     product(handle: $handle) {
    id
    title
    variants(first: 5) {
      edges {
        node {
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          id
          title
          weight
          sku
        }
      }
    }
    handle
    availableForSale
    createdAt
    description
    descriptionHtml
    images(first: 10) {
        nodes {
          altText
          id
          url
        }
      }
    
  }
  }
`;
