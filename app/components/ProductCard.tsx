"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { addToCart } from "../store/cartSlice";
import { useAppDispatch } from "../store/hooks";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success(`${product.title} added to cart!`, {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#4CAF50",
        color: "#fff",
      },
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-blue-500 overflow-hidden transition-shadow  duration-300 hover:shadow-xl hover:-translate-y-2">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <div className="flex  justify-between items-center">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 hover:scale-105"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
        <div className="mt-2 space-x-2">
          <span className="text-sm text-gray-500">
            {product.rating.rate} <span className="text-yellow-500">★</span>
          </span>
          <span className="text-sm text-gray-500">
            ({product.rating.count} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;










