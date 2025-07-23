"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  productCount: number;
  description?: string;
}

const CategoryCard = ({
  id,
  name,
  image,
  productCount,
  description,
}: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/catalog/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="relative group overflow-hidden rounded-lg shadow-sm h-full border border-gray-100 dark:border-steel-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1">{name}</h3>
              <p className="text-sm text-gray-300 mb-2">
                {productCount} наименований
              </p>
              {description && (
                <p className={`text-sm text-gray-300 line-clamp-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  {description}
                </p>
              )}
            </div>
            <motion.div
              animate={{ 
                x: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
              className="bg-white/20 rounded-full p-2 backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;