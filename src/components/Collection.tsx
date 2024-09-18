import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../constant";
import { ProductsResponse, Product } from "../types/shopify";

const { shop_url, storefrontAccessToken } = config();
const storeUrl = `https://${shop_url}/api/2024-07/graphql.json`;
const query = `
{
  products(first: 100) {
    edges {
      node {
        id
        title
        descriptionHtml
        vendor
        productType
        handle
        createdAt
        updatedAt
        variants(first: 5) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        images(first: 5) {
          edges {
            node {
              src
              altText
            }
          }
        }
      }
    }
  }
}
`;

const Collection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts(): Promise<void> {
      try {
        // console.log("Fetching products...");
        // Fetch data from Shopify Storefront API
        const response = await axios.post<{ data: ProductsResponse }>(
          storeUrl,
          { query },
          {
            headers: {
              "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
              "Content-Type": "application/json",
            },
          }
        );

        // Update state with fetched products
        const fetchedProducts: Product[] =
          response.data.data.products.edges.map((edge) => edge.node);
        setProducts(fetchedProducts);
        // console.log(fetchedProducts);
      } catch (error) {
        setError("Error fetching products");
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {products.length > 0 ? (
        <ul className="prodList flex sm:grid list-none flex-wrap justify-center gap-5 grid-cols-4 px-10 py-10">
          {products.map((product) => (
            <li className="prodCard m-auto" key={product.id}>
              <h3>{product.title}</h3>
              {product.images.edges.length > 0 ? (
                <img
                  src={product.images.edges[0].node.src}
                  alt={product.images.edges[0].node.altText || product.title}
                  width={200}
                  height={200}
                />
              ) : (
                <p>No images available</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Collection;
