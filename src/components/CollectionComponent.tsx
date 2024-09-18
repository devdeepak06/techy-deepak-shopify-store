import { useEffect, useState } from "react";
import { config } from "../constant";
import { AllProductsData, ProductNode } from "../types/shopify";
import { allProductsQuery } from "../utils/productQuery";
const { client } = config();

const CollectionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<ProductNode[]>([]);

  useEffect(() => {
    async function fetchedAllProducts() {
      try {
        const { data, errors, extensions } =
          await client.request<AllProductsData>(allProductsQuery);
        if (data && data.products) {
          const fetchedAllProd = data.products.nodes;
          setAllProducts(fetchedAllProd);
          console.log(fetchedAllProd);
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
    <div id="CollectionComponent">
      {error && <p>{error}</p>}
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

export default CollectionComponent;
