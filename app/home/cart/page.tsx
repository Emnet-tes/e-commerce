"use client";

import { db } from "@/firebase/clientApp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { removeFromCart, setCart} from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
export default function Cart() {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const userId = useAppSelector((state) => state.user.userId);

  const cartsCollection = collection(db, "carts");
  useEffect(() => {
    if (items.length === 0) {
      const fetchCartAndProducts = async () => {
        try {
          // Fetch ALL cart data
          const data = await getDocs(cartsCollection);
          // Filter by userId if needed
          const filteredData = data.docs.filter(
            (doc) => doc.data().userId.replace(/"/g, "") === userId
          );
          if (filteredData.length === 0) {
            // console.warn("No cart items found for user:", userId);
            setLoading(false);
            return;
          }

          dispatch(
            setCart(
              filteredData.map((doc) => {
                const docData = doc.data();
                return {
                  id: doc.id,
                  product: docData.product,
                  quantity: docData.quantity,
                  date: docData.date.toDate().toISOString(),
                };
              })
            )
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCartAndProducts();
    }
    else{
    
        setLoading(false); 
    }
  }, [items.length, userId]);


  const handleRemoveItem = async (id: string) => {
    try {
      const cartDoc = doc(db, "carts", id);
      await deleteDoc(cartDoc);

      toast.success("Item removed from cart!", {
        duration: 1500,
        position: "top-right",
        style: {
          background: "#f44336",
          color: "#fff",
        },
      });
      dispatch(removeFromCart(id));
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item from cart. Please try again.", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#f44336",
          color: "#fff",
        },
      });
    }
  };

  const shipping = 10;
  const tax = total * 0.1; // 10% tax
  const finalTotal = total + shipping + tax;

  if (loading) {
    return (
      <main className="bg-gray-100 min-h-screen">
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 pt-20">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some products to your cart to see them here.
            </p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div>
                <ul className=" gap-2 md:gap-4 flex flex-col">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="p-6 bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="flex items-center">
                        <div className="relative h-24 w-24 flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.title}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="ml-6 flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.product.title}
                          </h3>
                          <p className="text-gray-600">${item.product.price}</p>
                          <div className="mt-4 flex items-center">
                            <div className="flex items-center border border-gray-300 rounded-md">
                         
                              <span className="px-3 py-1 text-gray-900">
                                {item.quantity}
                              </span>
                           
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="ml-4 text-red-600 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <div className="ml-6">
                          <p className="text-lg font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors mt-6">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
