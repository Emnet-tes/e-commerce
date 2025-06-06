"use client";

import { addToCart } from "@/app/store/cartSlice";
import { useAppDispatch } from "@/app/store/hooks";
import { db } from "@/firebase/clientApp";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Product } from "../../../types";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const cartsCollection = collection(db, "carts");
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${params.id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);
  const handleAddToCart = async (product: Product) => {
    try {
      const userId = localStorage.getItem("user")?.replace(/"/g, "");
      const result = await addDoc(cartsCollection, {
        date: new Date(),
        userId: userId,
        product: {
          id: params.id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
        quantity: quantity,
      });

      dispatch(addToCart({ product, quantity: quantity, id: result.id }));
      toast.success(`${product.title} added to cart!`, {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#4CAF50",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart. Please try again.", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#f44336",
          color: "#fff",
        },
      });
    }
  };

  if (loading) {
    return (
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-2xl font-bold text-gray-900">
            Product not found
          </h1>
        </div>
      </main>
    );
  }

return (
  <main className="bg-slate-200 min-h-screen py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
        {/* Product Image */}
        <div className="relative h-96 w-full bg-white rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-gray-600 ml-2 text-sm">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              ${product.price}
            </p>
            <p className="text-gray-700 mb-6 text-sm">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border border-gray-300 rounded-l-md bg-white"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center border-t border-b border-gray-300 py-1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-r-md bg-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
            >
              Add to Cart
            </button>

            {/* Category */}
            <div>
              <h2 className="text-sm font-medium text-gray-700">Category</h2>
              <p className="text-gray-900 capitalize">{product.category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);

}
