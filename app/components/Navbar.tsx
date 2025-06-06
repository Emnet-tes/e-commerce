'use client';

import { LogOut, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '../store/hooks';
import { signOut } from '../utils/auth';

const Navbar = () => {
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Successfully logged out');
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/home" className="text-2xl font-bold text-gray-800">
            E-Shop
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/home" className="text-gray-600 hover:text-blue-900">
              Home
            </Link>
            <Link href="/home/products" className="text-gray-600 hover:text-blue-900 ">
              Products
            </Link>
            <Link href="/home/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-900 " />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2  text-blue-600 border border-blue-700 hover:bg-blue-700 cursor-pointer  hover:text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              <LogOut className="h-6 w-6" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 