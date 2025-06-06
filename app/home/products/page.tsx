"use client";

import { Suspense } from "react";
import ProductsContent from "../../components/ProductsContent";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="bg-gray-100 min-h-screen">
          <div className="min-h-screen flex items-center justify-center bg-white pt-20">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
