import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";

import { Product } from "../../../types/Products";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Interface for the dynamic route params
interface ProductPageProps {
  params: Promise<{ slug: string }>
}


// Helper to build image URLs from Sanity
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source).url();
}

// Fetch product data from Sanity
async function getProduct(slug: string): Promise<Product | null> {
  try {
    const product = await client.fetch(
      groq`*[_type == "product" && slug.current == $slug][0]{
        _id,
        productName,
        _type,
        image,
        price,
        description
      }`,
      { slug }
    );
    return product || null; // Return null if no product is found
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return <div className="text-center py-20">Product not found!</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square">
          {product.image ? (
            <Image
              src={urlFor(product.image) || "/placeholder.jpg"}
              alt={product.productName}
              width={300}
              height={350}
              quality={75}
              className="rounded-lg shadow-md object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
              <span>No Image Available</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold">{product.productName}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-sans">${product.price.toFixed(2)}</p>
          <button className="bg-purple-500 hover:bg-purple-700 text-center justify-center text-white font-bold py-2 px-4 rounded mt-2 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 4m12-4l2 4m-6 0h.01M7 17h10"
              />
            </svg>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
