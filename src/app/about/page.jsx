import HeroBg from '@/components/HeroBg';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  const founders = [
    { name: 'Wahab', image: 'wahab.svg', title: 'CEO' },
    { name: 'Janna', image: 'janna.svg', title: 'CEO' },
    { name: 'Meshal', image: 'meshal.svg', title: 'CEO' },
  ];

  const founderCards = founders.map((founder) => (
    <div key={founder.name} className='flex max-w-xl flex-col items-center p-4 text-center'>
      <img src={founder.image} alt={`${founder.name}'s profile`} className='mb-2 h-72 w-72 rounded-full' />
      <h1 className='pt-5 text-lg font-semibold text-gray-800 dark:text-gray-100'>{founder.name}</h1>
      <p className='text-secondary dark:text-primary'>{founder.title}</p>
    </div>
  ));

  return (
    <MainLayout>
      <Head>
        <title>About Us | Aurora Capital Bank</title>
        <meta
          name='description'
          content='Learn about Aurora Capital Bank and our commitment to modern financial solutions with integrity and innovation.'
        />
      </Head>

      <HeroBg className={'aurora-bg absolute w-screen h-screen top-0 right-0'}>
      </HeroBg>
      <main className='flex flex-col items-center space-y-16 px-4 py-10 pt-40 md:px-20 lg:px-32'>
        {/* About Us Section */}
        <section className='mb-5 text-center'>
          <h1 className='text-5xl font-bold text-gray-800 dark:text-gray-100'>About Us</h1>
          <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
            Where your financial goals and dreams become a reality.
          </p>
        </section>

        {/* Meet the Team Section */}
        <section className="mb-12 space-y-10 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center w-full">Meet the Team</h2> 
          <div className="flex justify-center space-x-4">
            {founderCards}
          </div>
        </section>

        {/* Aurora Capital Bank Section */}
        <section className='mb-12 space-y-10 text-center w-full'>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center w-full">Aurora Capital Bank</h2>
          <div className="mx-auto flex items-center justify-center p-8 md:p-12 w-full md:w-3/4 text-center rounded-lg shadow-lg border-solid border-[2px] bg-card">
            <p className='text-gray-700 dark:text-gray-300'>
              Established in 2024, Aurora Capital Bank has grown into a trusted leader in the financial industry, committed to
              serving individuals, businesses, and communities with innovative solutions tailored to modern financial needs.
            </p>
          </div>
        </section>

        {/* Our Mission and Vision Section */}
        <section className='mb-12 w-full md:w-3/4 flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 space-x-3'>
          {/* Our Mission Card with Border Animation */}
          <div className="flex flex-col items-center w-full md:w-1/2">
            <div className="relative z-10 w-full overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
              <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
              <div className="relative z-20 flex flex-col items-center w-full rounded-lg bg-background p-6 text-center">
                <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>Our Mission</h2>
                <p className='mt-4 text-gray-700 dark:text-gray-300'>
                  Our mission at Aurora Capital Bank is to empower our clients through responsible, transparent, and efficient
                  financial services.
                </p>
              </div>
            </div>
          </div>

          {/* Our Vision Card with Border Animation */}
          <div className="flex flex-col items-center w-full md:w-1/2">
            <div className="relative z-10 w-full overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
              <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
              <div className="relative z-20 flex flex-col items-center w-full rounded-lg bg-background p-6 text-center">
                <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>Our Vision</h2>
                <p className='mt-4 text-gray-700 dark:text-gray-300'>
                  We strive to be a leading force in financial services, known for our client-centric approach and ethical practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section Styled as Cards */}
        <section className='mb-12 space-y-10 w-full md:w-3/4'>
          <h2 className='text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center'>Core Values</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[
              { title: "Integrity", description: "Honesty, transparency, and responsibility." },
              { title: "Innovation", description: "Providing state-of-the-art solutions." },
              { title: "Customer First", description: "Guiding every decision we make." },
              { title: "Community Impact", description: "Supporting local businesses and social initiatives." },
            ].map((value, index) => (
              <div key={index} className='bg-primary dark:bg-secondary shadow-md rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700'>
                <h3 className='text-xl font-semibold text-white dark:text-foreground mb-2'>{value.title}</h3>
                <p className='text-white dark:text-foreground'>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section Styled as Row of Cards */}
        <section className='mb-12 space-y-10 w-full md:w-3/4'>
          <h2 className='text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6'>Services We Offer</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              {
                title: 'Personal Banking',
                description: 'Checking and savings accounts, personal loans, mortgages, and credit cards.',
              },
              {
                title: 'Business Banking',
                description: 'Business checking accounts, loans, cash management, and merchant services.',
              },
              {
                title: 'Wealth Management',
                description: 'Investment services, retirement planning, and financial advising.',
              },
              {
                title: 'Digital Banking',
                description: 'Seamless online and mobile banking, offering 24/7 access to your accounts.',
              },
            ].map((service, index) => (
              <div key={index} className="relative z-10 flex w-full overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
                <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
                <div className="relative z-20 flex flex-col items-center w-full rounded-lg bg-background p-6 text-center">
                  <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2'>{service.title}</h3>
                  <p className='text-gray-600 dark:text-gray-300'>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className='mb-12 space-y-10 text-center w-full'>
          <h2 className='text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center'>Why Choose Us?</h2>
          <div className="mx-auto flex items-center justify-center p-8 md:p-12 w-full md:w-3/4 text-center rounded-lg shadow-lg border-solid border-[2px] bg-card">
          <p className='text-gray-700 dark:text-gray-300 text-center'>
            With over 30 years of expertise and a solid reputation, Aurora Capital Bank is more than just a bank;
            we&apos;re a partner in your journey to financial success.
          </p>
          </div>
        </section>

        {/* Call to Action Section with Border Animation on Button */}
        <section className='text-center space-y-10 w-full md:w-3/4'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>Join the Aurora Capital Family Today</h2>
          <p className='mb-4 text-lg text-gray-700 dark:text-gray-300'>
            Whether you&apos;re just starting or have big goals in mind, Aurora Capital Bank is here to make your
            financial dreams come true. Let&apos;s grow together.
          </p>
          <Link href='/contact'>
            <div className=" m-10 relative z-10 inline-flex cursor-pointer overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
              <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
              <Button variant='outline' className="relative z-20 flex items-center rounded-lg bg-background px-8 py-3 text-center text-sm text-white shadow-2xl transition duration-200 hover:bg-slate-800">
                Contact Us
              </Button>
            </div>
          </Link>
        </section>
      </main>
    </MainLayout>
  );
}
