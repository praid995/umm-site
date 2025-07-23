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
    <section className="py-20 bg-gray-50 dark:bg-steel-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают нас</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            МеталлПром - это надежный поставщик качественного металлопроката с полным циклом услуг
          </p>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white dark:bg-steel-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-steel-700 group hover:shadow-md transition-all duration-300"
            >
              <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4 group-hover:bg-primary/20 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;