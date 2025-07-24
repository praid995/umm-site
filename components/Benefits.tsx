"use client";

import { motion } from "framer-motion";
import { Shield, Truck, Clock, Award, Search, PenTool as Tool } from "lucide-react";

const benefitsData = [
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Гарантия качества",
    description: "Весь металлопрокат сертифицирован и соответствует ГОСТ"
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: "Быстрая доставка",
    description: "Собственный автопарк и доставка по всей России"
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Оперативность",
    description: "Обработка заказа в течение 24 часов"
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "25 лет опыта",
    description: "Работаем с металлопрокатом с 1998 года"
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "Широкий ассортимент",
    description: "Более 5000 наименований металлопроката"
  },
  {
    icon: <Tool className="h-10 w-10 text-primary" />,
    title: "Обработка металла",
    description: "Предоставляем услуги резки и обработки"
  }
];

const Benefits = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="responsive-py bg-gray-50 dark:bg-steel-900">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="responsive-heading-2 mb-4 sm:mb-6">Почему выбирают нас</h2>
          <p className="responsive-text-lg text-muted-foreground max-w-3xl mx-auto">
            УРАЛМЕТАЛЛОМАРКЕТ - это надежный поставщик качественного металлопроката с полным циклом услуг и 25-летним опытом работы
          </p>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="responsive-grid-1-2-3"
        >
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              variants={item}
              className="responsive-card group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 will-change-transform"
            >
              <div className="p-3 sm:p-4 bg-primary/10 rounded-xl inline-block mb-4 sm:mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="responsive-text-base text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;