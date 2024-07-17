export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  sendLoginInfo: boolean;
  role: 'ADMIN' | 'USER';
  isTwoFactorEnabled: boolean;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
};


export type Category = {
  id: number;
  name: string;
  description: string;
  image?: string | null;
  isVisibleOnMainPage: boolean;
  isFeatured: boolean;
  position: number;
  users: User[];
  service: Service[];
  suggestedServices: SuggestedService[];
};

export type SuggestedService = {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  category?: Category | null;
};


export type Service = {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  isOnMainPage: boolean;
  price: number;
  salesTax?: number | null;
  directLink?: string | null;
  maxBookingPerSlot?: number | null;
  durationId: number; // Assuming Duration type has id as number
  categoryId?: number | null;
  category?: Category | null; // Assuming Category type is defined separately
  providerId?: string | null;
   siteId?: string | null;
  locations?: Location[]; // Assuming Location type is defined separately
};

