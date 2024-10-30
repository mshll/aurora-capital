import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

function MainLayout({ children, ...props }) {
  return (
    <>
      <NavBar />
      <main className='relative flex min-h-screen flex-col items-center justify-center' {...props}>
        {children}
      </main>
      <Footer />
    </>
  );
}
export default MainLayout;
