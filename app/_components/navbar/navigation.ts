'use client';
import {
  Home,
  Briefcase,
  BarChart2,
  Settings,
  DollarSign,
  HelpCircle,
  User,
  Package,
  FileText,
  CreditCard,
  Layers,
} from 'lucide-react';

export interface INavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: INavigationItem[];
}

const navigation: INavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Welcome', href: '/welcome', icon: Home },
  {
    name: 'Marketing Suite',
    href: '/marketing-suite',
    icon: Briefcase,
    
  },
  { name: 'Manage', href: '/marketing-suite/manage', icon: Briefcase,
    children: [
      { name: 'Services', href: '/marketing-suite/manage', icon: Briefcase },
      {
        name: 'Service Providers',
        href: '/marketing-suite/reports',
        icon: BarChart2,
      },
      { name: 'Clients', href: '/marketing-suite/manage', icon: Briefcase },
      { name: 'Users', href: '/marketing-suite/manage', icon: Briefcase },
      { name: 'line', href: '/marketing-suite/manage', icon: Briefcase },
    ], 

  },
  { name: 'Reports', href: '/marketing-suite/reports', icon: BarChart2 },

  { name: 'Payments', href: '/payments', icon: DollarSign },
  {
    name: 'Custom Features',
    href: '/custom-features',
    icon: Package,
    children: [
      { name: 'Feature 1', href: '/custom-features/feature1', icon: Package },
      { name: 'Feature 2', href: '/custom-features/feature2', icon: Package },
    ],
  },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Plans & Pricing', href: '/plans-pricing', icon: DollarSign },
  { name: 'Help', href: '/help', icon: HelpCircle },
  { name: 'Account', href: '/account', icon: User },
];

export default navigation;
