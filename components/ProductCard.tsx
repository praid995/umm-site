"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  specs: {
    [key: string]: string;
  };
  inStock: boolean;
  isNew?: boolean;
  isPopular?: boolean;
}

const ProductCard = ({
  id,
  name,
  category,
  image,
  specs,
  inStock,
  isNew = false,
  isPopular = false,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-steel-800 rounded-lg shadow-sm border border-gray-100 dark:border-steel-700 overflow-hidden h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-32 xs:h-40 sm:h-48 overflow-hidden bg-gray-100 dark:bg-steel-700">
        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute top-1.5 xs:top-2 left-1.5 xs:left-2 flex flex-col gap-1 xs:gap-2">
          {isNew && (
            <Badge className="bg-blue-500 hover:bg-blue-600 text-xs px-2 py-0.5">Новинка</Badge>
          )}
          {isPopular && (
            <Badge className="bg-copper-500 hover:bg-copper-600 text-xs px-2 py-0.5">
              Популярное
            </Badge>
          )}
          {!inStock && (
            <Badge variant="outline" className="bg-white/80 text-gray-700 text-xs px-2 py-0.5">
              Под заказ
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 xs:p-4 sm:p-5">
        <div className="mb-3 xs:mb-4">
          <div className="text-xs xs:text-sm text-muted-foreground mb-1">{category}</div>
          <Link href={`/product/${id}`}>
            <h3 className="text-sm xs:text-base sm:text-lg font-semibold hover:text-primary transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
        </div>

        {/* Specifications */}
        <ul className="space-y-1 mb-3 xs:mb-4 sm:mb-5">
          {Object.entries(specs).map(([key, value]) => (
            <li key={key} className="text-xs xs:text-sm flex">
              <span className="text-muted-foreground w-16 xs:w-20 sm:w-24 flex-shrink-0">
                {key}:
              </span>
              <span className="font-medium">{value}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col xs:flex-row gap-2 mt-auto">
          <Button variant="outline" size="sm" asChild className="text-xs xs:text-sm">
            <Link href={`/product/${id}`}>
              <span className="xs:hidden">Подробнее</span>
              <span className="hidden xs:inline">Подробнее</span>
              <ArrowRight className="ml-1 xs:ml-2 h-3 w-3 xs:h-4 xs:w-4" />
            </Link>
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="text-xs xs:text-sm">
                <span className="xs:hidden">Цена</span>
                <span className="hidden xs:inline">Запросить цену</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle className="text-sm xs:text-base">Запрос цены: {name}</DialogTitle>
                <DialogDescription>
                  Заполните форму и наш менеджер рассчитает стоимость и свяжется с вами
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Количество</Label>
                    <Input id="quantity" type="number" placeholder="Укажите необходимое количество" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment">Дополнительная информация</Label>
                    <Textarea id="comment" placeholder="Особые требования или вопросы" rows={3} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-xs xs:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Я согласен с{" "}
                      <Link href="/privacy" className="text-primary underline">
                        политикой конфиденциальности
                      </Link>
                    </label>
                  </div>
                </div>
                <Button type="submit" className="w-full">Отправить запрос</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;