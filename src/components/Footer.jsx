import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from './ui/button';
import { GitHubLogoIcon, TwitterLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { metadata } from '@/app/layout';
import Image from 'next/image';
import siteLogoFull from '@/images/logo-full.svg';

function Footer() {
  const sections = [
    {
      title: 'Personal',
      links: [
        { name: 'Accounts', href: '/accounts' },
        { name: 'Cards', href: '/cards' },
        { name: 'Loans', href: '/loans' },
        { name: 'Insurance', href: '/insurance' },
        { name: 'Investments', href: '/investments' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Team', href: '/team' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
        { name: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Support', href: '/support' },
        { name: 'Guides', href: '/guides' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Security Policy', href: '/security' },
      ],
    },
  ];

  const socials = [
    { name: 'GitHub', href: 'https://github.com/mshll/aurora-capital/', icon: <GitHubLogoIcon /> },
    { name: 'LinkedIn', href: '#', icon: <LinkedInLogoIcon /> },
    { name: 'Twitter', href: '#', icon: <TwitterLogoIcon /> },
    { name: 'Instagram', href: '#', icon: <InstagramLogoIcon /> },
  ];

  return (
    <footer className='w-full border-t border-border/[.5] bg-background'>
      <div className='container mx-auto flex flex-col items-center justify-between p-2'>
        <div className='flex w-full items-start justify-between gap-x-10 px-4 py-10'>
          <div className='flex flex-col items-start justify-center gap-6 text-start'>
            <Link href='/' className='flex items-center justify-center gap-x-2'>
              {/* <h1 className='text-3xl font-black tracking-tight'>{metadata.title}</h1> */}
              <Image src={siteLogoFull} alt={metadata.title} width={200} height={50} className='' />
            </Link>
            <p className='text-sm text-muted-foreground'>{metadata.description}</p>
            <div className='flex items-center justify-start gap-x-4'>
              {socials.map((social) => (
                <Link key={social.name} href={social.href}>
                  <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-primary'>
                    {social.icon}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <div className='flex flex-wrap items-baseline justify-between gap-x-32 gap-y-6 text-start'>
            {sections.map((section) => (
              <div key={section.title} className='flex flex-col items-start justify-center gap-4'>
                <h2 className='font-semibold'>{section.title}</h2>
                <ul className='flex flex-col items-start justify-start gap-1'>
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={'#'}>
                        <Button variant='link' size='sm' className='px-0 text-muted-foreground hover:text-primary'>
                          {link.name}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className='flex w-full items-center justify-between gap-x-4 pb-6 pt-2 font-[family-name:var(--font-geist-mono)] text-xs tracking-wider text-muted-foreground/[.8]'>
          <p>&copy; {new Date().getFullYear()} Boubyan Bank & CODED. All rights reserved.</p>
          <p>
            Made by{' '}
            <Link href='https://github.com/jannakam' target='_blank'>
              <Button variant='link' size='sm' className='px-0 text-muted-foreground/[.8] hover:text-primary'>
                Janna
              </Button>
            </Link>
            ,{' '}
            <Link href='https://github.com/mshll' target='_blank'>
              <Button variant='link' size='sm' className='px-0 text-muted-foreground/[.8] hover:text-primary'>
                Meshal
              </Button>
            </Link>
            , &{' '}
            <Link href='https://github.com/Althystro' target='_blank'>
              <Button variant='link' size='sm' className='px-0 text-muted-foreground/[.8] hover:text-primary'>
                Wahab
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
