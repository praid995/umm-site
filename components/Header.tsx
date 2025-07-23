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
      { href: "/catalog/steel", label: "Сталь" },
      { href: "/catalog/aluminum", label: "Алюминий" },
      { href: "/catalog/stainless", label: "Нержавейка" },
      { href: "/services/cutting", label: "Резка" },
      { href: "/services/delivery", label: "Доставка" }
    ]
  },
  { href: "/about", label: "О компании" },
  { href: "/services", label: "Услуги" },
  { href: "/blog", label: "Блог" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Контакты" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 dark:bg-steel-900/95 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        {/* Top Info Bar */}
        <div className="hidden md:flex py-2 justify-between items-center text-sm border-b">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+7 (800) 555-35-35</span>
            </div>
            <div className="flex items-center gap-2">
              <Map size={16} />
              <span>Екатеринбург, ул. Металлургов, 42</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Truck size={16} />
              <span>Доставка по всей России</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-1">
                  <span>Екатеринбург</span>
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
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
        
        {/* Main Navigation */}
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            <span className="font-heading font-bold text-xl">УРАЛМЕТАЛЛОМАРКЕТ</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              if (link.subMenu) {
                return (
                  <DropdownMenu key={link.href}>
                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary">
                      {link.label}
                      <ChevronDown size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {link.subMenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.href} asChild>
                          <Link href={subItem.href}>{subItem.label}</Link>
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
                  className={`relative transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary font-medium" : ""
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 top-full h-0.5 w-full bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button className="hidden md:flex">Запросить цену</Button>
            
            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col gap-6 py-6">
                    <Link href="/" className="flex items-center gap-2">
                      <Package className="h-6 w-6 text-primary" />
                      <span className="font-heading font-bold text-lg">УММ</span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                      {navLinks.map((link) => {
                        if (link.subMenu) {
                          return (
                            <div key={link.href} className="flex flex-col gap-2">
                              <div className="font-medium">{link.label}</div>
                              <div className="flex flex-col gap-2 pl-4">
                                {link.subMenu.map((subItem) => (
                                  <Link 
                                    key={subItem.href} 
                                    href={subItem.href}
                                    className="text-muted-foreground hover:text-primary"
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
                            className={`transition-colors hover:text-primary ${
                              pathname === link.href ? "text-primary font-medium" : ""
                            }`}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </nav>
                    <div className="flex flex-col gap-4 mt-6">
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        <span>+7 (800) 555-35-35</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Map size={16} />
                        <span>Екатеринбург, ул. Металлургов, 42</span>
                      </div>
                      <Button className="w-full mt-2">Запросить цену</Button>
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