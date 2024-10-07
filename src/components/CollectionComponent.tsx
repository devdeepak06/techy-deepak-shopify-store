import { useEffect, useState } from "react";
import { config } from "../constant";
import { AllProductsData, ProductNode } from "../types/shopify";
import { allProductsQuery } from "../utils/productQuery";
import { Link } from "react-router-dom";

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
        {/* Products using storefront api */}
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
                <img
                  src="https://images.unsplash.com/photo-1635352721344-ee65dbac28f0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={product.title}
                  width={200}
                  height={200}
                />
              )}
              <Link to={`/product/${product.handle}`}>
                <h3 className="text-center">{product.title}</h3>
              </Link>
              <p className="flex justify-between">
                {product.variants.nodes.length > 0 &&
                product.variants.nodes[0].price &&
                product.variants.nodes[0].price.amount ? (
                  <span className="font-bold">
                    {product.variants.nodes[0].price.amount}
                  </span>
                ) : (
                  <span></span>
                )}

                {product.variants.nodes.length > 0 &&
                product.variants.nodes[0].compareAtPrice &&
                product.variants.nodes[0].compareAtPrice.amount ? (
                  <span className="line-through">
                    {product.variants.nodes[0].compareAtPrice.amount}
                  </span>
                ) : (
                  <span></span>
                )}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <Loading />
      )}
    </div>
  );
};

function Loading() {
  return <h2 className="text-center">🌀 Loading...</h2>;
}

export default CollectionComponent;
