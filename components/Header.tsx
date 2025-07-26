"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Package, 
  Phone, 
  Map, 
  Truck, 
  Search,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "next-themes";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Главная" },
  { 
    href: "/catalog", 
    label: "Каталог",
    subMenu: [
      { href: "/catalog/black-metal", label: "Чёрный металлопрокат" },
      { href: "/catalog/colored-metal", label: "Цветной металлопрокат" },
      { href: "/catalog/stainless", label: "Нержавейка" }
    ]
  },
  { href: "/about", label: "О компании" },
  { 
    href: "/services", 
    label: "Услуги",
    subMenu: [
      { href: "/services/delivery", label: "Доставка Ж/Д и Автотранспортом" },
      { href: "/services/plasma-cutting", label: "Плазменная резка" },
      { href: "/services/cutting-to-size", label: "Резка в размер" }
    ]
  },
  { href: "/contact", label: "Контакты" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Закрытие мобильного меню при изменении маршрута
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 dark:bg-steel-900/95 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      } safe-area-padding`}
    >
      <div className="container-custom">
        {/* Top Info Bar */}
        <div className="hidden lg:flex py-2 xl:py-3 justify-between items-center text-xs xl:text-sm border-b border-border/50">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={16} />
              <a href="tel:+78005553535" className="hover:underline">
                <span className="hidden xl:inline">+7 (800) 555-35-35</span>
                <span className="xl:hidden">+7 (800) 555-35-35</span>
              </a>
            </div>
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <Map size={16} />
              <span className="hidden xl:inline">Екатеринбург, ул. Металлургов, 42</span>
              <span className="xl:hidden">Екатеринбург</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck size={16} />
              <span className="hidden xl:inline">Доставка по всей России</span>
              <span className="xl:hidden">Доставка</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-1 hover:text-primary transition-colors">
                  <span className="hidden xl:inline">Екатеринбург</span>
                  <span className="xl:hidden">ЕКБ</span>
                  <ChevronDown size={16} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Екатеринбург</DropdownMenuItem>
                <DropdownMenuItem>Москва</DropdownMenuItem>
                <DropdownMenuItem>Санкт-Петербург</DropdownMenuItem>
                <DropdownMenuItem>Новосибирск</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 hover:bg-accent"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
        
        {/* Main Navigation */}
        <div className="flex justify-between items-center py-4 sm:py-5 lg:py-6">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <Package className="h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-primary flex-shrink-0" />
            <span className="font-heading font-bold text-base xs:text-lg sm:text-xl lg:text-2xl">
              <span className="hidden sm:inline">УРАЛМЕТАЛЛОМАРКЕТ</span>
              <span className="sm:hidden">УММ</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              if (link.subMenu) {
                return (
                  <DropdownMenu key={link.href}>
                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary text-sm xl:text-base font-medium transition-colors py-2 px-1">
                      {link.label}
                      <ChevronDown size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[200px]">
                      {link.subMenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.href} asChild>
                          <Link href={subItem.href} className="w-full">
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative transition-colors hover:text-primary text-sm xl:text-base font-medium py-2 px-1 ${
                    pathname === link.href ? "text-primary" : ""
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 top-full h-0.5 w-full bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 sm:h-11 sm:w-11 hover:bg-accent touch-target"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Поиск</span>
            </Button>
            <Button className="hidden md:flex text-sm px-4 py-2 sm:px-6 sm:py-3 touch-target">
              <span className="hidden lg:inline">Запросить цену</span>
              <span className="lg:hidden">Цена</span>
            </Button>
            
            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 sm:h-11 sm:w-11 hover:bg-accent touch-target"
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Открыть меню</span>
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-[85vw] max-w-sm sm:max-w-md safe-area-padding"
                >
                  <div className="flex flex-col gap-8 py-6 h-full">
                    <Link 
                      href="/" 
                      className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Package className="h-8 w-8 text-primary" />
                      <span className="font-heading font-bold text-xl">УММ</span>
                    </Link>
                    
                    <nav className="flex flex-col gap-6 flex-1">
                      {navLinks.map((link) => {
                        if (link.subMenu) {
                          return (
                            <div key={link.href} className="flex flex-col gap-3">
                              <div className="font-semibold text-lg text-foreground">{link.label}</div>
                              <div className="flex flex-col gap-3 pl-4 border-l-2 border-border">
                                {link.subMenu.map((subItem) => (
                                  <Link 
                                    key={subItem.href} 
                                    href={subItem.href}
                                    className="text-muted-foreground hover:text-primary transition-colors py-1 touch-target"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`transition-colors hover:text-primary text-lg py-2 touch-target ${
                              pathname === link.href ? "text-primary font-semibold" : "font-medium"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </nav>
                    
                    <div className="flex flex-col gap-4 pt-6 border-t border-border">
                      <a 
                        href="tel:+78005553535" 
                        className="flex items-center gap-3 hover:text-primary transition-colors touch-target"
                      >
                        <Phone size={16} />
                        <span className="font-medium">+7 (800) 555-35-35</span>
                      </a>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Map size={16} />
                        <span className="text-sm">Екатеринбург, ул. Металлургов, 42</span>
                      </div>
                      <Button 
                        className="w-full mt-4 touch-target" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Запросить цену
                      </Button>
                      
                      <div className="flex justify-center mt-4">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-10 w-10 hover:bg-accent touch-target"
                          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          <span className="sr-only">Переключить тему</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;