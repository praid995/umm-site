"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

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

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      title: "Металлопрокат высшего качества",
      subtitle: "Большой ассортимент стали, алюминия и нержавейки для любых нужд",
      image: "https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      cta: "Каталог продукции",
      link: "/catalog"
    },
    {
      id: 2,
      title: "Современное производство",
      subtitle: "Используем передовые технологии и строгий контроль качества",
      image: "https://images.pexels.com/photos/2570060/pexels-photo-2570060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      cta: "О компании",
      link: "/about"
    },
    {
      id: 3,
      title: "Резка и обработка металла",
      subtitle: "Предоставляем полный спектр услуг по обработке металлопроката",
      image: "/images/Car_rez.webp",
      cta: "Наши услуги",
      link: "/services"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Image Slider */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="container-custom relative h-full flex flex-col justify-center">
        <motion.div
          key={currentSlide}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={container}
          className="max-w-3xl text-white"
        >
          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            {slides[currentSlide].title}
          </motion.h1>
          <motion.p 
            variants={item} 
            className="text-xl md:text-2xl mb-8 text-gray-100"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-md text-base">
              <Link href={slides[currentSlide].link}>
                {slides[currentSlide].cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="rounded-md text-base bg-transparent text-white border-white hover:bg-white hover:text-black">
                  Оставить заявку
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Оставить заявку</DialogTitle>
                  <DialogDescription>
                    Заполните форму и наш менеджер свяжется с вами в ближайшее время
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
                      <Label htmlFor="comment">Комментарий</Label>
                      <Textarea id="comment" placeholder="Опишите ваш запрос" rows={3} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Я согласен с{" "}
                        <Link href="/privacy" className="text-primary underline">
                          политикой конфиденциальности
                        </Link>
                      </label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Отправить</Button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>

        {/* Slider Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-white w-10"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-white/80"
        >
          <span className="text-sm mb-2">Прокрутите вниз</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;