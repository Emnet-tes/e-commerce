"use client";

import { Suspense } from "react";
import ProductsContent from "../components/ProductsContent";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="bg-gray-100 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          </div>
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
