import DesktopNav from './desktop-nav';
import MobileNav from './mobile-nav';

export interface INavigation {
  name: string;
  href: string;
}
const navigation: INavigation[] = [
  { name: 'Server pagination', href: '/serverpagination' },
  { name: 'Infinite scroll', href: '/infinitescroll' },
];

export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-muted  shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-blur-lg dark:border-secondary-foreground'>
      <nav
        className='container flex h-16 max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8'
        aria-label='Global'
      >
        <DesktopNav navigation={navigation} />
        <MobileNav navigation={navigation} />
      </nav>
    </header>
  );
}
