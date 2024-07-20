import DesktopNav from './desktop-nav';
import MobileNav from './mobile-nav';
import navigation from './navigation';



export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 w-full border-b  shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-blur-lg '>
      <nav
        className=' flex h-16 max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8'
        aria-label='Global'
      >
        <DesktopNav navigation={navigation} />
        <MobileNav navigation={navigation} />
      </nav>
    </header>
  );
}
