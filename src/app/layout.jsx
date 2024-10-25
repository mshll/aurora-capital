import localFont from 'next/font/local';
import './globals.css';
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

const cairo = Cairo();

export const metadata = {
  title: 'Aurora Capital',
  description: 'Illuminating Your Financial Future',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${cairo.className} ${geistMono.variable} bg-background text-foreground antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <NavBar />
          <main className='flex min-h-screen flex-col items-center justify-center'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
