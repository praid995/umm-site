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
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={`/catalog/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="relative group overflow-hidden rounded-xl shadow-sm h-full border border-gray-100 dark:border-steel-700 min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] will-change-transform"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        <div className="relative h-full overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-steel-700 animate-pulse" />
          )}
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3">
                {name}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 mb-2 sm:mb-3">
                {productCount} наименований
              </p>
              {description && (
                <p className={`text-sm sm:text-base text-gray-200 line-clamp-2 transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  {description}
                </p>
              )}
            </div>
            <motion.div
              animate={{ 
                x: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0.5,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="bg-white/20 rounded-full p-2 sm:p-3 backdrop-blur-sm flex-shrink-0 border border-white/20"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </motion.div>
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-primary/10 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      </motion.div>
    </Link>
  );
};

export default CategoryCard;