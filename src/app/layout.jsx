import localFont from 'next/font/local';
import './globals.css';
import NavBar from '@/components/NavBar';

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

export const metadata = {
  title: 'Aurora Capital',
  description: 'Illuminating Your Financial Future',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className=''>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-background text-foreground antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
