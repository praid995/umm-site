import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'УРАЛМЕТАЛЛОМАРКЕТ - Производство и поставка металлопроката',
  description: 'Производство и поставка высококачественного металлопроката: сталь, алюминий, нержавейка. Услуги резки и доставки.',
  keywords: 'металлопрокат, сталь, алюминий, нержавейка, доставка металла, резка металла, УММ, УРАЛМЕТАЛЛОМАРКЕТ',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2a3e' }
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'УММ',
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning className="smooth-scroll">
      <body className={cn(
        inter.variable, 
        poppins.variable,
        "min-h-screen bg-background font-sans antialiased overflow-x-hidden"
      )}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}