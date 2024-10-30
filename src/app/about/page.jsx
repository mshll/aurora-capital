// pages/about.js

import MainLayout from '@/components/MainLayout';
import StarConstellation from '@/components/StarConstellation';
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
    <div key={founder.name} className='flex flex-col items-center text-center p-4'>
      <img src={founder.image} alt={`${founder.name}'s profile`} className='w-96 h-96 rounded-full mb-2' />
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

      <main className='pt-40 px-4 py-10 md:px-20 lg:px-32 space-y-16 flex flex-col items-center'>

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
          <div className='flex justify-center space-x-4'>
            {founderCards}
          </div>
        </section>
        {/* <section>
          <div className='inherit'>
        <StarConstellation />
          </div>
        </section> */}

        {/* Aurora Capital Bank Section */}
        <section className='mb-12 p-8 md:p-12 w-full md:w-3/4 text-center rounded-lg shadow-lg border-solid border-[2px]'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>Aurora Capital Bank</h2>
          <p className='text-gray-700 dark:text-gray-300'>
            Established in 2024, Aurora Capital Bank has grown into a trusted leader in the financial industry, committed to
            serving individuals, businesses, and communities with innovative solutions tailored to modern financial needs.
          </p>
        </section>

        {/* Our Mission and Vision Section */}
        <section className='mb-12 w-full md:w-3/4 flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 space-x-3'>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:w-1/2 text-center'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>Our Mission</h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Our mission at Aurora Capital Bank is to empower our clients through responsible, transparent, and efficient
              financial services.
            </p>
          </div>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:w-1/2 text-center'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>Our Vision</h2>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              We strive to be a leading force in financial services, known for our client-centric approach and ethical practices.
            </p>
          </div>
        </section>

        {/* Core Values Section */}
        <section className='mb-12 p-8 md:p-12 w-full md:w-3/4'>
          <h2 className='text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center'>Core Values</h2>
          <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2'>
            <li><strong>Integrity</strong>: Honesty, transparency, and responsibility.</li>
            <li><strong>Innovation</strong>: Providing state-of-the-art solutions.</li>
            <li><strong>Customer First</strong>: Guiding every decision we make.</li>
            <li><strong>Community Impact</strong>: Supporting local businesses and social initiatives.</li>
          </ul>
        </section>

        {/* Services Section Styled as Row of Cards */}
        <section className='mb-12 w-full md:w-3/4'>
          <h2 className='text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6'>Services We Offer</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              { title: "Personal Banking", description: "Checking and savings accounts, personal loans, mortgages, and credit cards." },
              { title: "Business Banking", description: "Business checking accounts, loans, cash management, and merchant services." },
              { title: "Wealth Management", description: "Investment services, retirement planning, and financial advising." },
              { title: "Digital Banking", description: "Seamless online and mobile banking, offering 24/7 access to your accounts." },
            ].map((service, index) => (
              <div key={index} className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center'>
                <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2'>{service.title}</h3>
                <p className='text-gray-600 dark:text-gray-300'>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className='mb-12 p-8 md:p-12 w-full md:w-3/4 border-solid border-[2px]'>
          <h2 className='text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center'>Why Choose Us?</h2>
          <p className='text-gray-700 dark:text-gray-300 text-center'>
            With over 30 years of expertise and a solid reputation, Aurora Capital Bank is more than just a bank;
            we&apos;re a partner in your journey to financial success.
          </p>
        </section>

        

        {/* Call to Action Section */}
        <section className='text-center w-full md:w-3/4'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>Join the Aurora Capital Family Today</h2>
          <p className='mb-4 text-lg text-gray-700 dark:text-gray-300'>
            Whether you&apos;re just starting or have big goals in mind, Aurora Capital Bank is here to make your
            financial dreams come true. Let&apos;s grow together.
          </p>
          <Link href='/contact'>
          <Button variant='outline'>
            Contact Us
          </Button>
          </Link>
        </section>
      </main>
    </MainLayout>
  );
}
