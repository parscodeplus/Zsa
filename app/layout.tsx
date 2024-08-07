import type { Metadata, Viewport } from 'next';
import BottomNavigation from '@/components/buttom-navigation';
const APP_NAME = 'PWA App';
const APP_DEFAULT_TITLE = 'My Awesome PWA App';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION = 'Best PWA app in the world!';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import dynamic from 'next/dynamic';
import Header from './header';
import TopLoader from '@/components/ui/toploader';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from './_components/navbar/navbar';
import { cn } from '@/lib/utils';

const NetworkOffline = dynamic(() => import('@/components/net-offline'), {
  ssr: false,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir='rtl' lang='fa'>
      <body className={cn('min-h-screen bg-background antialiased')}>
        <div className='relative flex min-h-screen flex-col'>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            disableTransitionOnChange
          >
            <TopLoader />

            <NetworkOffline />
            <Navbar />
            {/* <Header /> */}
            {children}
            <Toaster />
            <BottomNavigation />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
