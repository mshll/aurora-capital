import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
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
      <h1 className='font-semibold text-gray-800 dark:text-gray-100'>{founder.name}</h1>
      <p className='text-gray-600 dark:text-gray-300'>{founder.title}</p>
    </div>
  ));

  return (
    <MainLayout>
      {/* <div className='w-auto h-[100px]'></div> */}
      <Head>
        <title>About Us | Aurora Capital Bank</title>
        <meta
          name='description'
          content='Learn about Aurora Capital Bank and our commitment to modern financial solutions with integrity and innovation.'
        />
      </Head>

      <main className='flex flex-col items-center space-y-16 px-4 py-10 pt-40 md:px-20 lg:px-32'>
        {/* About Us Section */}
        <section className='mb-12 text-center'>
          <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-100'>About Us</h1>
          <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
            Where your financial goals and dreams become a reality.
          </p>
        </section>

        {/* Meet the Team Section */}
        <section className='mb-12 text-center'>
          <h2 className='text-3xl font-semibold text-gray-800 dark:text-gray-100'>Meet the Team</h2>
          <div className='flex justify-center space-x-4'>{founderCards}</div>
        </section>
        {/* <section>
          <div className='inherit'>
        <StarConstellation />
          </div>
        </section> */}

        {/* Aurora Capital Bank Section */}
        <section className='mb-12 w-full rounded-lg border-[2px] border-solid p-8 text-center shadow-lg md:w-3/4 md:p-12'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>Aurora Capital Bank</h2>
          <p className='text-gray-700 dark:text-gray-300'>
            Established in 2024, Aurora Capital Bank has grown into a trusted leader in the financial industry,
            committed to serving individuals, businesses, and communities with innovative solutions tailored to modern
            financial needs.
          </p>
        </section>

        {/* Our Mission and Vision Section */}
        <section className='mb-12 flex w-full flex-col justify-between space-x-3 space-y-8 md:w-3/4 md:flex-row md:space-y-0'>
          <div className='rounded-lg p-6 text-center shadow-lg dark:bg-card md:w-1/2'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>Our Mission</h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Our mission at Aurora Capital Bank is to empower our clients through responsible, transparent, and
              efficient financial services.
            </p>
          </div>
          <div className='rounded-lg p-6 text-center shadow-lg dark:bg-card md:w-1/2'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>Our Vision</h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We strive to be a leading force in financial services, known for our client-centric approach and ethical
              practices.
            </p>
          </div>
        </section>

        {/* Core Values Section */}
        <section className='mb-12 w-full p-8 md:w-3/4 md:p-12'>
          <h2 className='text-center text-3xl font-semibold text-gray-800 dark:text-gray-100'>Core Values</h2>
          <ul className='list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300'>
            <li>
              <strong>Integrity</strong>: Honesty, transparency, and responsibility.
            </li>
            <li>
              <strong>Innovation</strong>: Providing state-of-the-art solutions.
            </li>
            <li>
              <strong>Customer First</strong>: Guiding every decision we make.
            </li>
            <li>
              <strong>Community Impact</strong>: Supporting local businesses and social initiatives.
            </li>
          </ul>
        </section>

        {/* Services Section Styled as Row of Cards */}
        <section className='mb-12 w-full md:w-3/4'>
          <h2 className='mb-6 text-center text-3xl font-semibold text-gray-800 dark:text-gray-100'>
            Services We Offer
          </h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
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
              <div key={index} className='rounded-lg p-6 text-center shadow-md dark:bg-card'>
                <h3 className='mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100'>{service.title}</h3>
                <p className='text-gray-600 dark:text-gray-300'>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className='mb-12 w-full border-[2px] border-solid p-8 md:w-3/4 md:p-12'>
          <h2 className='text-center text-3xl font-semibold text-gray-800 dark:text-gray-100'>Why Choose Us?</h2>
          <p className='text-center text-gray-700 dark:text-gray-300'>
            With over 30 years of expertise and a solid reputation, Aurora Capital Bank is more than just a bank;
            we&apos;re a partner in your journey to financial success.
          </p>
        </section>

        {/* Call to Action Section */}
        <section className='w-full text-center md:w-3/4'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>
            Join the Aurora Capital Family Today
          </h2>
          <p className='mb-4 text-lg text-gray-700 dark:text-gray-300'>
            Whether you&apos;re just starting or have big goals in mind, Aurora Capital Bank is here to make your
            financial dreams come true. Let&apos;s grow together.
          </p>
          <Link href='/contact'>
            <Button variant='outline'>Contact Us</Button>
          </Link>
        </section>
      </main>
    </MainLayout>
  );
}
