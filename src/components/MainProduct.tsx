import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../constant";
import { SingleProductsData, MVariantNode } from "../types/shopify";
import { singleProductQuery } from "../utils/productQuery";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const { client } = config();
import { CartItem, Product } from "../types/types";
interface SingleProductProps {
  AddToCartDrawer: (product: Product) => void;
}
const SingleProduct: React.FC<SingleProductProps> = ({ AddToCartDrawer }) => {
  const { handle } = useParams();
  const [product, setProduct] = useState<SingleProductsData | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<MVariantNode | null>(
    null
  );
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!handle) {
      setError("Product handle is missing.");
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        const { data, errors } = await client.request(singleProductQuery, {
          variables: { handle: handle },
        });

        if (data?.product) {
          setProduct(data.product);
          if (data.product.variants.edges.length > 0) {
            setSelectedVariant(data.product.variants.edges[0]);
            setActiveButton(0);
          }
        } else if (errors) {
          console.log("errors", errors);
          setError("Failed to fetch product details.");
        }
      } catch (err) {
        setError("Error fetching product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [handle]);

  if (loading) {
    return <h2>🌀 Loading Product...</h2>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <h2>No product available</h2>;
  }

  const handleVariantClick = (variant: MVariantNode) => {
    setSelectedVariant(variant);
  };

  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };
  const handleAddToCart = () => {
    if (selectedVariant) {
      const price = selectedVariant.node.price?.amount ?? null;
      const compareAtPrice =
        selectedVariant.node.compareAtPrice?.amount ?? null;
      const currencyCode = selectedVariant.node.price?.currencyCode ?? null;
      const image = product.images.nodes.at(0) || null;
      const cartItem: CartItem = {
        id: selectedVariant.node.id?.split("/").pop() || "",
        title: product.title,
        price: {
          amount: price,
          currencyCode: currencyCode,
        },
        compareAtPrice: {
          amount: compareAtPrice,
          currencyCode: currencyCode,
        },
        quantity: 1,
        image: image,
      };

      AddToCartDrawer(cartItem);
    }
  };

  return (
    <div className="single-product p-7 flex">
      <div className="media-carousel w-1/3">
        <Swiper
          loop={true}
          spaceBetween={10}
          className="mySwiper2"
          modules={[Thumbs, FreeMode, Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          freeMode={true}
          navigation={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {product.images.nodes.map((image) => (
            <SwiperSlide key={image.id}>
              <img
                src={image.url}
                alt={product.title}
                className="w-full h-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="product-details w-2/3 p-5">
        <h2 className="font-bold text-2xl">{product.title}</h2>
        <p className="leading-tight py-2">{product.description}</p>
        <h4 className="font-bold text-xl py-2">Available Variants</h4>
        {product.variants.edges.length > 0 && (
          <div className="product-variants flex gap-7">
            {product.variants.edges.map((variant, index) => (
              <button
                key={variant.node.id}
                className={`button ${activeButton === index ? "active" : ""}`}
                onClick={() => {
                  handleVariantClick(variant);
                  handleButtonClick(index);
                }}
              >
                {variant.node.title}
              </button>
            ))}
          </div>
        )}
        {selectedVariant && (
          <div className="mt-4">
            <h3 className="font-bold text-lg">Selected Variant:</h3>
            {selectedVariant.node.title}
            <div className="flex items-center">
              <span className="font-bold">
                Rs. {selectedVariant.node.price?.amount || "N/A"}
              </span>
              {selectedVariant.node.compareAtPrice && (
                <span className="line-through text-gray-500 ml-2">
                  Rs. {selectedVariant.node.compareAtPrice.amount || "N/A"}
                </span>
              )}
            </div>
          </div>
        )}
        <div className="product-form__buttons">
          <button
            type="button"
            onClick={handleAddToCart}
            className="product-form__submit button"
            disabled={!selectedVariant || loading}
          >
            {loading ? "Adding..." : "Add to cart"}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default SingleProduct;
