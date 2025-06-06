"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Typewriter from "typewriter-effect";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Why from "../components/Why";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/productSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative  w-full h-[600px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/shop.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay for soft darkening */}
        <div className="absolute inset-0 bg-black opacity-15 z-10" />

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 ">
            <Typewriter
              options={{
                strings: [
                  "ONE DESTINATION, ENDLESS CHOICES",
                  "Shop the Latest Trends",
                  "Unbeatable Convenience",
                ],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 30,
              }}
            />
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            At eShop, we bring you the best deals, trending products, and
            unbeatable convenience.
          </p>
          <Link
            href="/home/products"
            className="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition"
          >
            Shop now
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-10 ">
        <Categories />
      </section>
      {/* Featured Products */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center text-black">
            Featured Products
          </h2>
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <Why />
      </section>
    </div>
  );
}
