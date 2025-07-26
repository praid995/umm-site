import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import CategoryCard from "@/components/CategoryCard";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/Microinteractions";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Sample categories
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
    {
      id: "tube",
      name: "Трубы",
      image: "https://images.pexels.com/photos/220639/pexels-photo-220639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      productCount: 967,
      description: "Различные типы труб для строительства и производства"
    },
    {
      id: "sheet",
      name: "Листы",
      image: "https://images.pexels.com/photos/162286/steel-stairs-staircase-metal-162286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      productCount: 754,
      description: "Металлические листы различной толщины и размеров"
    },
    {
      id: "profile",
      name: "Профили",
      image: "https://images.pexels.com/photos/259751/pexels-photo-259751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      productCount: 632,
      description: "Разнообразные профили для строительства и производства"
    },
  ];
  

  return (
    <>
      <Hero />
      <Benefits />
      
      {/* Categories Section */}
      <section className="py-20">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Наш ассортимент</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Широкий выбор металлопроката для любых целей - от строительства до производства
              </p>
            </div>
          </FadeIn>
          
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <StaggerItem key={category.id}>
                  <CategoryCard {...category} />
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/catalog">
                Перейти в каталог
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Нужна консультация?</h2>
              <p className="text-lg opacity-90 mb-8">
                Наши специалисты готовы ответить на все ваши вопросы и помочь с выбором металлопроката. Свяжитесь с нами любым удобным способом.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/contact">
                    Контакты
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  +7 (800) 555-35-35
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Customer support team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      <ChatWidget />
    </>
  );
}