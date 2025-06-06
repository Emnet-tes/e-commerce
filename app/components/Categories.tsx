import Image from 'next/image';
import Link from 'next/link';

import { categories } from '../utils/constants'; 
   
const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.link}
            className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                {category.name}
              </h3>
              <span className="text-white/80 group-hover:text-white transition-colors">
                Shop Now →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories