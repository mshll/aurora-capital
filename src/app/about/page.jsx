// pages/about.js
import MainLayout from '@/components/MainLayout';
import Head from 'next/head';
import Image from 'next/image';

export default function About() {
  const founders = [
    { name: 'Wahab', image: '', title: 'CEO' },
    { name: 'Janna', image: '', title: 'CEO' },
    { name: 'Meshal', image: '', title: 'CEO' },
  ];
  const founderCards = founders.map((founder) => {
    return (
      <div className='flex flex-row items-center justify-center' key={founder.name}>
        <div className='flex flex-col items-center justify-center'>
          <Image src={`${founder.image}`} alt={founder.name} />
          <h1>{founder.name}</h1>
          <h1>{founder.title}</h1>
        </div>
      </div>
    );
  });
  //chat bot can be removed from page.js the main one /src/app/page.jsx
  return (
    <MainLayout>
      <div className='h-20 w-20'> </div>
      {/* this div makes the about us title do down a lil since it  going inside the navbar */}
      <Head>
        <title>About Us | Aurora Capital Bank</title>
        <meta
          name='description'
          content='Learn about Aurora Capital Bank and our commitment to modern financial solutions with integrity and innovation.'
        />
      </Head>

      <main className='px-4 py-10 md:px-20 lg:px-32'>
        <section className='mb-12 text-center'>
          <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-100'>About Us</h1>
          <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
            Where your financial goals and dreams become a reality.
          </p>
        </section>

        <section className='mb-12 p-8 md:p-12'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>Aurora Capital Bank</h2>
          <p className='text-gray-700 dark:text-gray-300'>
            Established in 2024, Aurora Capital Bank has grown into a trusted leader in the financial industry,
            committed to serving individuals, businesses, and communities with innovative solutions tailored to modern
            financial needs. We believe in combining traditional banking values with cutting-edge technology to ensure a
            seamless, secure, and personalized banking experience.
          </p>
        </section>

        <section className='mb-12 p-8 md:p-12'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>Our Mission</h2>
          <p className='text-gray-700 dark:text-gray-300'>
            Our mission at Aurora Capital Bank is to empower our clients through responsible, transparent, and efficient
            financial services. We are dedicated to helping you grow your wealth, achieve your aspirations, and secure a
            brighter future. Our team of professionals is driven by a commitment to integrity, innovation, and customer
            satisfaction.
          </p>
        </section>

        <section className='mb-12 p-8 md:p-12'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>Our Vision</h2>
          <p className='text-gray-700 dark:text-gray-300'>
            Aurora Capital Bank strives to be a leading force in financial services, known for our client-centric
            approach and unwavering commitment to ethical practices. We envision a world where banking is easy,
            accessible, and a positive force in our customers&apos; lives.
          </p>
        </section>

        <section className='mb-12 p-8 md:p-12'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>Core Values</h2>
          <ul className='list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300'>
            <li>
              <strong>Integrity</strong>: We operate with the highest standards of honesty, transparency, and
              responsibility.
            </li>
            <li>
              <strong>Innovation</strong>: We continuously innovate to provide state-of-the-art solutions for a
              fast-changing world.
            </li>
            <li>
              <strong>Customer First</strong>: Our clients are at the heart of everything we do, guiding every decision
              we make.
            </li>
            <li>
              <strong>Community Impact</strong>: We invest in the communities we serve, supporting local businesses and
              social initiatives.
            </li>
          </ul>
        </section>

        <section className='mb-12 p-8 md:p-12'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>Services We Offer</h2>
          <p className='text-gray-700 dark:text-gray-300'>
            Aurora Capital Bank provides a range of services designed to meet diverse financial needs:
          </p>
          <ul className='mt-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300'>
            <li>
              <strong>Personal Banking</strong>: Checking and savings accounts, personal loans, mortgages, and credit
              cards.
            </li>
            <li>
              <strong>Business Banking</strong>: Business checking accounts, loans, cash management, and merchant
              services.
            </li>
            <li>
              <strong>Wealth Management</strong>: Investment services, retirement planning, and financial advising.
            </li>
            <li>
              <strong>Digital Banking</strong>: Seamless online and mobile banking, offering 24/7 access to your
              accounts.
            </li>
          </ul>
        </section>

        <section className='mb-12 p-8 md:p-12'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>Why Choose Us?</h2>
          <p className='text-gray-700 dark:text-gray-300'>
            With over 30 years of expertise and a solid reputation, Aurora Capital Bank is more than just a bank;
            we&apos;re a partner in your journey to financial success. From small steps to big milestones, our dedicated
            team will be with you every step of the way, providing exceptional service and personalized solutions.
          </p>
        </section>

        <section className='mb-12 p-8 md:p-12'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>Contact Us</h2>
          <p className='text-gray-700 dark:text-gray-300'>
            <strong>Headquarters</strong>: 1234 Silver Street, New Haven, Anywhere, 01234
          </p>
          <p className='text-gray-700 dark:text-gray-300'>
            <strong>Customer Service</strong>: (800) 555-7890
          </p>
          <p className='text-gray-700 dark:text-gray-300'>
            <strong>Email</strong>:{' '}
            <a href='mailto:support@auroracapbank.com' className='text-blue-600 hover:underline dark:text-blue-400'>
              support@auroracapbank.com
            </a>
          </p>
        </section>

        <section className='rounded-lg py-10 text-center'>
          <h2 className='mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100'>
            Join the Aurora Capital Family Today
          </h2>
          <p className='mb-4 text-lg text-gray-700 dark:text-gray-300'>
            Whether you&apos;re just starting or have big goals in mind, Aurora Capital Bank is here to make your
            financial dreams come true. Let&apos;s grow together.
          </p>
          <>{founderCards}</>
          <button className='rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-800'>
            Contact Us
          </button>
        </section>
      </main>
    </MainLayout>
  );
}
