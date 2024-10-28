import './globals.css';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import { Cairo } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const cairo = Cairo({ subsets: ['latin', 'latin-ext', 'arabic'] });

export const metadata = {
  title: 'Aurora Capital Bank',
  description: 'Illuminating Your Financial Future',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icon-light.ico?v=1',
        href: '/icon-light.ico?v=1',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icon-dark.ico?v=1',
        href: '/icon-dark.ico?v=1',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${cairo.className} ${geistSans.variable} ${geistMono.variable} relative bg-background text-foreground antialiased`}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
