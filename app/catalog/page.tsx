"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, SlidersHorizontal, ArrowDownUp } from "lucide-react";

import FilterSidebar from "@/components/FilterSidebar";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Sample data
const categories = [
  {
    id: "steel",
    name: "Сталь",
    image: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    productCount: 1254,
    description: "Широкий ассортимент стальных изделий различных марок и форм"
  },
  {
    id: "aluminum",
    name: "Алюминий",
    image: "https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    productCount: 873,
    description: "Легкие и прочные алюминиевые изделия для различных отраслей"
  },
  {
    id: "stainless",
    name: "Нержавейка",
    image: "https://images.pexels.com/photos/247931/pexels-photo-247931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    productCount: 542,
    description: "Коррозионностойкие изделия из нержавеющей стали высокого качества"
  },
];

const formOptions = [
  { id: "tube", name: "Труба" },
  { id: "sheet", name: "Лист" },
  { id: "circle", name: "Круг" },
  { id: "square", name: "Квадрат" },
  { id: "rectangle", name: "Прямоугольник" },
  { id: "hexagon", name: "Шестигранник" },
];

const gostOptions = [
  { id: "8639-82", name: "ГОСТ 8639-82" },
  { id: "8645-68", name: "ГОСТ 8645-68" },
  { id: "10704-91", name: "ГОСТ 10704-91" },
  { id: "19281-2014", name: "ГОСТ 19281-2014" },
  { id: "32512-2013", name: "ГОСТ 32512-2013" },
];

const materialOptions = [
  { id: "st3sp", name: "Ст3сп" },
  { id: "st3ps", name: "Ст3пс" },
  { id: "st20", name: "Ст20" },
  { id: "st35", name: "Ст35" },
  { id: "st45", name: "Ст45" },
];

// Sample featured products
const featuredProducts = [
  {
    id: "prod1",
    name: "Труба стальная электросварная прямошовная",
    category: "Трубы",
    image: "https://images.pexels.com/photos/2598753/pexels-photo-2598753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    specs: {
      "Диаметр": "57 мм",
      "Толщина": "3.5 мм",
      "ГОСТ": "10704-91",
      "Марка стали": "Ст3сп",
    },
    inStock: true,
    isPopular: true,
  },
  {
    id: "prod2",
    name: "Лист горячекатаный",
    category: "Листы",
    image: "https://images.pexels.com/photos/3030520/pexels-photo-3030520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    specs: {
      "Толщина": "8 мм",
      "Размер": "1500x6000 мм",
      "ГОСТ": "19903-2015",
      "Марка стали": "Ст3пс",
    },
    inStock: true,
  },
  {
    id: "prod3",
    name: "Круг стальной горячекатаный",
    category: "Круги",
    image: "https://images.pexels.com/photos/2248339/pexels-photo-2248339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    specs: {
      "Диаметр": "40 мм",
      "Длина": "6000 мм",
      "ГОСТ": "2590-2006",
      "Марка стали": "Ст45",
    },
    inStock: true,
    isNew: true,
  },
  {
    id: "prod4",
    name: "Профильная труба прямоугольная",
    category: "Профильные трубы",
    image: "https://images.pexels.com/photos/342451/pexels-photo-342451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    specs: {
      "Размер": "40x20 мм",
      "Толщина": "2 мм",
      "ГОСТ": "8645-68",
      "Марка стали": "Ст3сп",
    },
    inStock: false,
  },
  {
    id: "prod5",
    name: "Швеллер стальной горячекатаный",
    category: "Швеллеры",
    image: "https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    specs: {
      "Номер": "12П",
      "Высота": "120 мм",
      "ГОСТ": "8240-97",
      "Марка стали": "Ст3сп",
    },
    inStock: true,
    isPopular: true,
  },
  {
    id: "prod6",
    name: "Уголок стальной равнополочный",
    category: "Уголки",
    image: "https://images.pexels.com/photos/1129354/pexels-photo-1129354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    specs: {
      "Размер": "50x50 мм",
      "Толщина": "5 мм",
      "ГОСТ": "8509-93",
      "Марка стали": "Ст3пс",
    },
    inStock: true,
  },
];

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<"categories" | "products">("categories");
  const [sortOption, setSortOption] = useState("popular");

  return (
    <>
      <div className="bg-gray-50 dark:bg-steel-900 py-6 xs:py-8 sm:py-10 md:py-16">
        <div className="container-custom">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Главная</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/catalog">Каталог</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Каталог металлопроката</h1>
          <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-3xl">
            Широкий выбор высококачественного металлопроката различных марок и размеров для любых нужд производства и строительства.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-6 xs:py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar */}
          <FilterSidebar 
            forms={formOptions} 
            gosts={gostOptions} 
            materials={materialOptions}
            thicknessRange={[0.5, 150]}
            lengthRange={[0.5, 12]}
          />
          
          {/* Main Content */}
          <div className="flex-1">
            {/* View switcher and sorting */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <Button
                  variant={viewMode === "categories" ? "default" : "outline"}
                  onClick={() => setViewMode("categories")}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 flex-1 sm:flex-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span className="hidden xs:inline">Категории</span>
                  <span className="xs:hidden">Кат.</span>
                </Button>
                <Button
                  variant={viewMode === "products" ? "default" : "outline"}
                  onClick={() => setViewMode("products")}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 flex-1 sm:flex-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="hidden xs:inline">Все товары</span>
                  <span className="xs:hidden">Товары</span>
                </Button>
              </div>
              
              {viewMode === "products" && (
                <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <ArrowDownUp size={18} className="text-muted-foreground" />
                  <Select
                    value={sortOption}
                    onValueChange={setSortOption}
                  >
                    <SelectTrigger className="w-full sm:w-[160px] lg:w-[180px] text-xs sm:text-sm">
                      <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">По популярности</SelectItem>
                      <SelectItem value="new">Сначала новые</SelectItem>
                      <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                      <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            {/* Categories View */}
            {viewMode === "categories" && (
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {categories.map((category) => (
                  <CategoryCard key={category.id} {...category} />
                ))}
              </div>
            )}
            
            {/* Products View */}
            {viewMode === "products" && (
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {viewMode === "products" && (
              <div className="flex justify-center mt-8 sm:mt-12">
                <nav className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm"
                  >
                    1
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm"
                  >
                    2
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm"
                  >
                    3
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm"
                  >
                    4
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <ChatWidget />
    </>
  );
}