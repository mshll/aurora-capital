import './globals.css';
import localFont from 'next/font/local';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Cairo } from 'next/font/google';

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
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${cairo.className} ${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <NavBar />
          <main className='flex min-h-screen flex-col items-center justify-center'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
