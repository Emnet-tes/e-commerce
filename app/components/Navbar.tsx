"use client";

import { LogOut, Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../store/hooks";
import { signOut } from "../utils/auth";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Successfully logged out");
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      {/* Top navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/home" className="text-2xl font-bold text-gray-800">
              E-Shop
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/home" className="text-gray-600 hover:text-blue-900">
                Home
              </Link>
              <Link
                href="/home/products"
                className="text-gray-600 hover:text-blue-900"
              >
                Products
              </Link>
              <Link href="/home/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-900" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-blue-600 border border-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-md transition"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700"
              >
                {mobileMenuOpen? <X className="h-6 w-6" />:<Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Slide-in mobile menu */}
      <div
        className={`fixed top-12 right-0 z-50 h-fit w-64 bg-slate-50 rounded-md shadow-lg transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-z-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-4 px-6 py-4">
          <Link
            href="/home"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-700 hover:text-blue-900"
          >
            Home
          </Link>
          <Link
            href="/home/products"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-700 hover:text-blue-900"
          >
            Products
          </Link>
          <Link
            href="/home/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="relative text-gray-700 hover:text-blue-900"
          >
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </div>
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
            className="flex items-center space-x-2 text-blue-600 border border-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-md"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
