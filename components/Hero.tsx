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
  const [isLoaded, setIsLoaded] = useState(false);
  
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
    setIsLoaded(true);
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
    <section className="relative h-[100svh] min-h-[600px] max-h-[900px] overflow-hidden safe-area-padding">
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
            priority={index === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="container-custom relative h-full flex flex-col justify-center items-start">
        <motion.div
          key={currentSlide}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={container}
          className="w-full max-w-4xl text-white z-10"
        >
          <motion.h1
            variants={item}
            className="responsive-heading-1 mb-4 sm:mb-6 text-white"
          >
            {slides[currentSlide].title}
          </motion.h1>
          <motion.p 
            variants={item} 
            className="responsive-text-lg mb-8 sm:mb-10 text-gray-100 leading-relaxed max-w-2xl"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
          <motion.div variants={item} className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
            <Button asChild size="lg" className="responsive-button bg-primary hover:bg-primary/90">
              <Link href={slides[currentSlide].link}>
                {slides[currentSlide].cta}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="responsive-button bg-transparent text-white border-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  Оставить заявку
                </Button>
              </DialogTrigger>
              <DialogContent className="responsive-modal">
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl">Оставить заявку</DialogTitle>
                  <DialogDescription>
                    Заполните форму и наш менеджер свяжется с вами в ближайшее время
                  </DialogDescription>
                </DialogHeader>
                <form className="responsive-form mt-6">
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Имя</Label>
                      <Input id="name" placeholder="Ваше имя" className="responsive-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input id="email" type="email" placeholder="email@example.com" className="responsive-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">Телефон</Label>
                      <Input id="phone" placeholder="+7 (___) ___-__-__" className="responsive-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comment" className="text-sm font-medium">Комментарий</Label>
                      <Textarea 
                        id="comment" 
                        placeholder="Опишите ваш запрос" 
                        rows={4} 
                        className="responsive-input resize-none"
                      />
                    </div>
                    <div className="flex items-start space-x-3 pt-2">
                      <Checkbox id="terms" className="mt-1" />
                      <label
                        htmlFor="terms"
                        className="text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Я согласен с{" "}
                        <Link href="/privacy" className="text-primary underline">
                          политикой конфиденциальности
                        </Link>
                      </label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full responsive-button">Отправить заявку</Button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>

        {/* Slider Navigation */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 touch-target ${
                currentSlide === index
                  ? "bg-white w-8 sm:w-12"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 hidden md:block z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-white/80 hover:text-white transition-colors cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
        >
          <span className="text-sm mb-2 font-medium">Прокрутите</span>
          <ChevronDown size={24} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;