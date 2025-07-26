import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const categories = [
  {
    id: "tube-products",
    name: "Трубный прокат",
    image: "https://images.pexels.com/photos/2598753/pexels-photo-2598753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: [
      { name: "Труба стальная", href: "/catalog/steel-tube" },
      { name: "Труба профильная", href: "/catalog/profile-tube" }
    ]
  },
  {
    id: "sheet-products",
    name: "Листовой прокат",
    image: "https://images.pexels.com/photos/3030520/pexels-photo-3030520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: [
      { name: "Лист стальной", href: "/catalog/steel-sheet" },
      { name: "Лист конструкционный", href: "/catalog/structural-sheet" },
      { name: "Лист оцинкованный", href: "/catalog/galvanized-sheet" },
      { name: "Лист ПВЛ", href: "/catalog/pvl-sheet" },
      { name: "Лист рифленый", href: "/catalog/checkered-sheet" },
      { name: "Лист 09Г2С", href: "/catalog/09g2s-sheet" }
    ]
  },
  {
    id: "bar-products",
    name: "Сортовой прокат",
    image: "https://images.pexels.com/photos/2248339/pexels-photo-2248339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: [
      { name: "Арматура", href: "/catalog/rebar" },
      { name: "Квадрат", href: "/catalog/square-bar" },
      { name: "Круг", href: "/catalog/round-bar" },
      { name: "Проволока стальная", href: "/catalog/steel-wire" },
      { name: "Шестигранник", href: "/catalog/hexagon-bar" }
    ]
  },
  {
    id: "shaped-products",
    name: "Фасонный прокат",
    image: "https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: [
      { name: "Уголок стальной равнополочный", href: "/catalog/equal-angle" },
      { name: "Уголок стальной неравнополочный", href: "/catalog/unequal-angle" },
      { name: "Уголок гнутый", href: "/catalog/bent-angle" },
      { name: "Балка", href: "/catalog/beam" },
      { name: "Швеллер", href: "/catalog/channel" },
      { name: "Швеллер гнутый", href: "/catalog/bent-channel" }
    ]
  },
  {
    id: "rebar-products",
    name: "Изделия из арматуры",
    image: "https://images.pexels.com/photos/1129354/pexels-photo-1129354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: [
      { name: "Сварная арматурная сетка", href: "/catalog/welded-mesh" },
      { name: "Кладочная сетка", href: "/catalog/masonry-mesh" },
      { name: "Сетка рабница", href: "/catalog/chain-link" },
      { name: "Гнутые элементы", href: "/catalog/bent-elements" }
    ]
  },
  {
    id: "welded-beam",
    name: "Сварная балка",
    image: "https://images.pexels.com/photos/342451/pexels-photo-342451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: []
  },
  {
    id: "profiled-sheet",
    name: "Профнастил",
    image: "https://images.pexels.com/photos/162286/steel-stairs-staircase-metal-162286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: []
  }
];

export default function BlackMetalCatalogPage() {
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
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/catalog/black-metal">Чёрный металлопрокат</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Чёрный металлопрокат</h1>
          <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-3xl">
            Широкий ассортимент чёрного металлопроката: трубы, листы, сортовой и фасонный прокат высокого качества.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-6 xs:py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white dark:bg-steel-800 rounded-lg shadow-sm border border-gray-100 dark:border-steel-700 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {category.name}
                  </h3>
                </div>
              </div>
              
              <div className="p-6">
                {category.subcategories.length > 0 ? (
                  <div className="space-y-2">
                    {category.subcategories.map((subcategory, index) => (
                      <Link
                        key={index}
                        href={subcategory.href}
                        className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-steel-700 transition-colors group"
                      >
                        <span className="text-sm font-medium group-hover:text-primary">
                          {subcategory.name}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <Button asChild>
                      <Link href={`/catalog/${category.id}`}>
                        Перейти к товарам
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}