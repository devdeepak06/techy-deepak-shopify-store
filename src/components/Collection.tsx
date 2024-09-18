import { useEffect, useState } from "react";
// import axios from "axios";
import { config } from "../constant";
import { AllProductsData, ProductNode } from "../types/shopify";

// const { shop_url, storefrontAccessToken } = config();
const { client } = config();
// const storeUrl = `https://${shop_url}/api/2024-07/graphql.json`;

//Define your GraphQL queries based on the data you need
const allProductsQuery = `
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
        values
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

const singleProductQuery = `
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
    featuredImage {
      altText
      height
      id
      width
    }
    
  }
  }
`;

const { data, errors, extensions } = await client.request(singleProductQuery, {
  variables: {
    handle: "millet-monk-millet-bar",
  },
});

if (data) {
  // console.log(data.product.title, data);
} else if (errors) {
  console.log("errors", errors);
} else if (extensions) {
  console.log(extensions, "extensions");
}
// const query = `
// {
//   products(first: 100) {
//   nodes {
//       id
//       title
//       handle
//       createdAt
//       description
//       descriptionHtml
//       images(first: 10) {
//         nodes {
//           altText
//           id
//           url
//         }
//       }
//       options(first: 10) {
//         id
//         name
//         values
//       }
//       productType
//       publishedAt
//       tags
//       updatedAt
//       vendor
//       variants(first: 10) {
//         nodes {
//           compareAtPrice {
//             amount
//             currencyCode
//           }
//           image {
//             altText
//             height
//             id
//             url
//           }
//           id
//           price {
//             amount
//             currencyCode
//           }
//           sku
//           title
//           weight
//           weightUnit
//           taxable
//           requiresShipping
//           selectedOptions {
//             name
//             value
//           }
//           unitPriceMeasurement {
//             quantityValue
//             referenceUnit
//             referenceValue
//             quantityUnit
//             measuredType
//           }
//           unitPrice {
//             amount
//             currencyCode
//           }
//         }
//       }
//     }
//   }
// }
// `;

const Collection = () => {
  // const [products, setProducts] = useState<ProductNode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<ProductNode[]>([]);

  // useEffect(() => {
  //   async function fetchProducts(): Promise<void> {
  //     try {
  //       // Fetch data from Shopify Storefront API
  //       const response = await axios.post<{ data: AllProductsData }>(
  //         storeUrl,
  //         { query },
  //         {
  //           headers: {
  //             "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       // Check if the response structure is correct
  //       if (
  //         response.data &&
  //         response.data.data &&
  //         response.data.data.products
  //       ) {
  //         const fetchedProducts: ProductNode[] =
  //           response.data.data.products.nodes.map((edge) => edge);
  //         setProducts(fetchedProducts);
  //         // console.log(fetchedProducts);
  //       } else {
  //         throw new Error("Unexpected response structure");
  //       }
  //     } catch (error) {
  //       setError("Error fetching products");
  //       console.error("Error fetching products:", error);
  //     }
  //   }

  //   fetchProducts();
  // }, []);

  useEffect(() => {
    async function fetchedAllProducts() {
      try {
        const { data, errors, extensions } =
          await client.request<AllProductsData>(allProductsQuery);
        if (data && data.products) {
          const fetchedAllProd = data.products.nodes;
          setAllProducts(fetchedAllProd);
          // console.log(fetchedAllProd);
        } else if (errors) {
          console.error("Errors occurred:", errors);
        } else if (extensions) {
          console.log("No data received");
        }
      } catch (error) {
        setError("Error fetching products");
        console.error("Error fetching products:", error);
      }
    }

    fetchedAllProducts();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {/* <h4 className="text-center text-2xl font-bold from-neutral-950">
        Products using storefront api
      </h4>
      {products.length > 0 ? (
        <ul className="prodList flex sm:grid list-none flex-wrap justify-center gap-5 grid-cols-4 px-10 py-10">
          {products.map((product) => (
            <li className="prodCard m-auto" key={product.id}>
              {product.images.nodes.length > 0 ? (
                <img
                  src={product.images.nodes[0].url}
                  alt={product.images.nodes[0].altText || product.title}
                  width={200}
                  height={200}
                />
              ) : (
                <p>No images available</p>
              )}
              <h3>{product.title}</h3>
              <p className="flex justify-between">
                {product.variants.nodes.length > 0 &&
                product.variants.nodes[0].price &&
                product.variants.nodes[0].price.amount ? (
                  <span className="font-bold">
                    {product.variants.nodes[0].price.amount}
                  </span>
                ) : (
                  <span>No price available</span>
                )}

                {product.variants.nodes.length > 0 &&
                product.variants.nodes[0].compareAtPrice &&
                product.variants.nodes[0].compareAtPrice.amount ? (
                  <span className="line-through">
                    {product.variants.nodes[0].compareAtPrice.amount}
                  </span>
                ) : (
                  <span>No compare at price</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )} */}

      <h4 className="text-center text-2xl font-bold from-neutral-950">
        Products using storefront api
      </h4>
      {allProducts.length > 0 ? (
        <ul className="prodList flex sm:grid list-none flex-wrap justify-center gap-5 grid-cols-4 px-10 py-10">
          {allProducts.map((product) => (
            <li className="prodCard m-auto" key={product.id}>
              {product.images.nodes.length > 0 ? (
                <img
                  src={product.images.nodes[0].url}
                  alt={product.images.nodes[0].altText || product.title}
                  width={200}
                  height={200}
                />
              ) : (
                <p>No images available</p>
              )}
              <h3>{product.title}</h3>
              <p className="flex justify-between">
                {product.variants.nodes.length > 0 &&
                product.variants.nodes[0].price &&
                product.variants.nodes[0].price.amount ? (
                  <span className="font-bold">
                    {product.variants.nodes[0].price.amount}
                  </span>
                ) : (
                  <span>No price available</span>
                )}

                {product.variants.nodes.length > 0 &&
                product.variants.nodes[0].compareAtPrice &&
                product.variants.nodes[0].compareAtPrice.amount ? (
                  <span className="line-through">
                    {product.variants.nodes[0].compareAtPrice.amount}
                  </span>
                ) : (
                  <span>No compare at price</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Collection;
