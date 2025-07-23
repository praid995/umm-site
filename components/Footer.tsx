import Link from "next/link";
import { Package, Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-steel-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Package className="h-8 w-8 text-white" />
              <span className="font-heading font-bold text-xl">УММ</span>
            </Link>
            <p className="text-gray-300 text-sm max-w-xs">
              Производство и поставка высококачественного металлопроката для промышленных нужд с 1998 года.
            </p>
            <div className="flex flex-col space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <span>+7 (800) 555-35-35</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <span>info@umm.ru</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span>Москва, ул. Металлургов, 42</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span>Пн-Пт: 9:00-18:00</span>
              </div>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Каталог</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/catalog/steel" className="hover:text-white">Сталь</Link></li>
              <li><Link href="/catalog/aluminum" className="hover:text-white">Алюминий</Link></li>
              <li><Link href="/catalog/stainless" className="hover:text-white">Нержавейка</Link></li>
              <li><Link href="/catalog/tube" className="hover:text-white">Трубы</Link></li>
              <li><Link href="/catalog/sheet" className="hover:text-white">Листы</Link></li>
              <li><Link href="/catalog/profile" className="hover:text-white">Профили</Link></li>
              <li><Link href="/catalog/circle" className="hover:text-white">Круги</Link></li>
              <li><Link href="/catalog/fittings" className="hover:text-white">Арматура</Link></li>
            </ul>
          </div>

          {/* Services & Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Услуги и информация</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/services/cutting" className="hover:text-white">Резка металла</Link></li>
              <li><Link href="/services/delivery" className="hover:text-white">Доставка</Link></li>
              <li><Link href="/about" className="hover:text-white">О компании</Link></li>
              <li><Link href="/blog" className="hover:text-white">Блог</Link></li>
              <li><Link href="/faq" className="hover:text-white">Часто задаваемые вопросы</Link></li>
              <li><Link href="/contact" className="hover:text-white">Контакты</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Политика конфиденциальности</Link></li>
              <li><Link href="/terms" className="hover:text-white">Условия использования</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Подпишитесь на рассылку</h4>
            <p className="text-gray-300 text-sm mb-4">
              Получайте актуальные новости и предложения по металлопрокату.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Ваш e-mail" 
                className="bg-steel-800 border-steel-700 text-white"
              />
              <Button variant="default">
                <ArrowRight size={16} />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Подписываясь, вы соглашаетесь с нашей{" "}
              <Link href="/privacy" className="text-gray-300 hover:text-white">
                политикой конфиденциальности
              </Link>
              .
            </p>
          </div>
        </div>

        <hr className="border-steel-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ООО "УРАЛМЕТАЛЛОМАРКЕТ". Все права защищены.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.542 2.023a2.453 2.453 0 0 1 2.435 2.435v15.084a2.453 2.453 0 0 1-2.435 2.435H4.458a2.453 2.453 0 0 1-2.435-2.435V4.458a2.453 2.453 0 0 1 2.435-2.435h15.084zm-3.26 5.292c-.676 0-1.203.15-1.614.447-.41.298-.722.689-.936 1.172l-.053.121h-.132v-1.51H11.16v10.448h2.616V13.29c0-.873.097-1.588.341-2.112.245-.523.67-.785 1.276-.785.422 0 .725.168.908.505.183.337.275.842.275 1.514v5.602h2.616v-6.012c0-1.175-.275-2.067-.825-2.677-.55-.61-1.301-.914-2.254-.914h-.184l.003-.097zm-9.855.23v10.448h2.616V7.545H6.426zm1.34-4.296c-.434 0-.801.15-1.102.452-.3.301-.45.67-.45 1.105 0 .434.15.801.45 1.102.3.3.668.45 1.102.45.435 0 .801-.15 1.102-.45.3-.3.452-.668.452-1.102 0-.434-.151-.804-.452-1.105-.3-.301-.667-.452-1.102-.452z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;