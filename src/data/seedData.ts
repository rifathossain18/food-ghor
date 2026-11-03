import { Category, Product, Testimonial } from '../types';
import { JaggeryImages } from '../assets/jaggeryImages';

export const SEED_CATEGORIES: Category[] = [
  {
    id: 1,
    slug: 'patali-gur',
    name_bn: 'পাটালি গুড়',
    description_bn: 'যশোরের আদি পদ্ধতিতে মাটির চুলায় গাঢ় করে তৈরি শক্ত ও সুবাসিত মিষ্টি পাটালি গুড়।',
    sort_order: 1,
    is_active: 1
  },
  {
    id: 2,
    slug: 'nolen-gur',
    name_bn: 'নলেন গুড় (তরল/ঝুলা)',
    description_bn: 'পৌষের ভোরে সংগৃহীত প্রথম তাজা রসের সুঘ্রাণযুক্ত মোলায়েম তরল নলেন গুড়।',
    sort_order: 2,
    is_active: 1
  },
  {
    id: 3,
    slug: 'khejurer-dana-gur',
    name_bn: 'দানাদার খেজুর গুড়',
    description_bn: 'আদি খয়েরি রঙের দানাযুক্ত ঐতিহ্যবাহী চুয়াডাঙ্গা ও যশোরের খাঁটি গুড়।',
    sort_order: 3,
    is_active: 1
  }
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: 1,
    category_id: 1,
    category_name_bn: 'পাটালি গুড়',
    slug: 'jashori-khejurer-patali',
    name_bn: 'যশোরের প্রিমিয়াম খেজুর পাটালি গুড়',
    short_desc_bn: '১০০% খাঁটি ও চিনিমুক্ত। যশোরের গাছিদের দীর্ঘদিনের অভিজ্ঞতায় মাটির চুলায় নিপুণ আঁচে জ্বাল দেওয়া আদি পাটালি।',
    long_desc_bn: 'যশোরের রূপদিয়া ও বাঘারপাড়ার বিখ্যাত খেজুর বাগান থেকে ভোরবেলার টাটকা রস সংগ্রহ করে দীর্ঘ ৩–৪ ঘণ্টা মাটির উনুনে জ্বাল দিয়ে তৈরি হয় এই বিশেষ পাটালি গুড়। এতে কোনো প্রকার সোডা, হাইড্রোজ, বা চিনির কৃত্রিম সংযোজন নেই। মুখে দিলেই গলে যাবে এবং আদি খেজুর রসের মাদকতাময় সুবাস ছড়িয়ে পড়বে। শীতের সকালে রুটি, চিতই পিঠা কিংবা মুড়ির সাথে এর তুলনা চলে না।',
    price_bdt: 480,
    weight_grams: 500,
    stock_status: 'in_stock',
    image_primary: JaggeryImages.patali,
    images_json: [
      JaggeryImages.patali,
      JaggeryImages.hero,
      JaggeryImages.dana
    ],
    is_featured: 1,
    is_active: 1,
    meta_title_bn: 'যশোরের প্রিমিয়াম খেজুর পাটালি গুড় — ফুড ঘর',
    meta_desc_bn: 'কেমিক্যাল ও চিনিমুক্ত খাঁটি যশোরের পাটালি গুড়। ৫০০ গ্রাম প্যাক।'
  },
  {
    id: 2,
    category_id: 2,
    category_name_bn: 'নলেন গুড় (তরল/ঝুলা)',
    slug: 'premiere-nolen-gur-liquid',
    name_bn: 'সুবাসিত আদি নলেন গুড় (ঝুলা/তরল)',
    short_desc_bn: 'শীতের প্রথম রসের অতুলনীয় ঘ্রাণে ভরপুর গাঢ় তরল নলেন গুড়। পিঠাপুলি, পায়েস ও ক্ষীরের জন্য অতুলনীয়।',
    long_desc_bn: 'নলেন গুড় হলো বাঙালির শীতের সেরা উপহার। শীতের কনকনে ঠাণ্ডা রাতে গাছের ডগা চেঁছে হাঁড়িতে জমা হওয়া প্রথম রস জ্বাল দিয়ে তৈরি হয় এই তরল নলেন গুড়। কোনো কৃত্রিম ঘনকারী বা রঙ ছাড়া প্রাকৃতিক ঘনত্বে তৈরি এই গুড় দুধ বা ক্ষীরে দিলে কখনোই কেটে যায় না। কাচের এয়ারটাইট বয়ামে সরবরাহ করা হয় যাতে ঘ্রাণ থাকে একদম অটুট।',
    price_bdt: 750,
    weight_grams: 1000,
    stock_status: 'in_stock',
    image_primary: JaggeryImages.nolen,
    images_json: [
      JaggeryImages.nolen,
      JaggeryImages.hero,
      JaggeryImages.gift
    ],
    is_featured: 1,
    is_active: 1,
    meta_title_bn: 'সুবাসিত খাঁটি নলেন গুড় (তরল) — ফুড ঘর',
    meta_desc_bn: '১ কেজি কাচের বয়ামে আসল নলেন গুড়। চিনি ও কেমিক্যাল মুক্ত।'
  },
  {
    id: 3,
    category_id: 3,
    category_name_bn: 'দানাদার খেজুর গুড়',
    slug: 'khejurer-dana-gur-special',
    name_bn: 'বিশেষ দানাদার খয়েরি খেজুর গুড়',
    short_desc_bn: 'জিভে দিলে দানা দানা ক্রাঞ্চি অনুভূতি। চা, কফি বা সরাসরি খাওয়ার জন্য অতুলনীয় পুষ্টিকর গুড়।',
    long_desc_bn: 'ঐতিহ্যবাহী গাছিদের বিশেষ কৌশল ও তাপমাত্রা নিয়ন্ত্রণের মাধ্যমে রস যখন গাঢ় হয়ে জমাট বাঁধার ঠিক আগের মুহূর্তে নাড়িয়ে তৈরি করা হয় এই দানাদার গুড়। এতে থাকা সূক্ষ্ম দানাগুলো স্বাদে নিয়ে আসে অনন্য মিষ্টি মাত্রা। সকালের লাল চা কিংবা ফিরনিতে চিনির পরিবর্তে এর ব্যবহারে যেমন স্বাস্থ্য বজায় থাকে, তেমনি পাওয়া যায় অনন্য প্রাকৃতিক মিষ্টি।',
    price_bdt: 520,
    weight_grams: 500,
    stock_status: 'in_stock',
    image_primary: JaggeryImages.dana,
    images_json: [
      JaggeryImages.dana,
      JaggeryImages.patali
    ],
    is_featured: 1,
    is_active: 1,
    meta_title_bn: 'বিশেষ দানাদার খয়েরি খেজুর গুড় — ফুড ঘর',
    meta_desc_bn: '৫০০ গ্রাম দানাদার খেজুর গুড়। খাঁটি প্রাকৃতিক চিনি মুক্ত।'
  },
  {
    id: 4,
    category_id: 1,
    category_name_bn: 'পাটালি গুড়',
    slug: 'magh-maasher-kacha-mithai',
    name_bn: 'মাঘ মাসের স্পেশাল কচি মিঠাই পাটালি',
    short_desc_bn: 'তীব্র শীতের মিষ্টি গন্ধ ও হালকা মোলায়েম টেক্সচার। প্রিমিয়াম পরিবারগুলোর বিশেষ পছন্দ।',
    long_desc_bn: 'মাঘ মাসের মাঝামাঝি যখন কুয়াশা ও শীতের প্রকোপ সর্বোচ্চ থাকে, তখন গাছের রস হয় সবচেয়ে ঘন ও সুমিষ্ট। সেই বিশেষ সময়ের সীমিত সংগৃহীত রস দিয়ে তৈরি হয় আমাদের এই কাঁচা মিঠাই পাটালি। সাধারণ পাটালির চেয়ে এটি আরও বেশি মোলায়েম ও কোমল।',
    price_bdt: 850,
    weight_grams: 800,
    stock_status: 'in_stock',
    image_primary: JaggeryImages.patali,
    images_json: [
      JaggeryImages.patali,
      JaggeryImages.hero
    ],
    is_featured: 0,
    is_active: 1,
    meta_title_bn: 'মাঘ মাসের স্পেশাল কচি মিঠাই পাটালি — ফুড ঘর',
    meta_desc_bn: '৮০০ গ্রাম সীমিত সংস্করণের কচি মিঠাই পাটালি গুড়।'
  },
  {
    id: 5,
    category_id: 2,
    category_name_bn: 'নলেন গুড় (তরল/ঝুলা)',
    slug: 'organic-jaggery-combo-pack',
    name_bn: 'ফুড ঘর রাজকীয় গুড় উপহার বক্স',
    short_desc_bn: '১ কেজি নলেন গুড় + ৫০০ গ্রাম পাটালি গুড়ের আকর্ষণীয় উপহার বাক্স। প্রিয়জনকে উপহার দিতে আদর্শ।',
    long_desc_bn: 'শীতের উৎসব ও পিঠার আয়োজনে আত্মীয়-স্বজন বা করপোরেট উপহারের জন্য বিশেষভাবে প্রস্তুত ফুড ঘরের রাজকীয় উপহার বাক্স। এতে রয়েছে একটি খাঁটি কাচের জারে ১ কেজি নলেন গুড় এবং একটি পরিবেশবান্ধব পাটের ব্যাগে ৫০০ গ্রাম সেরা পাটালি গুড়। বিশুদ্ধতার গ্যারান্টি কার্ড সহ আসে।',
    price_bdt: 1250,
    weight_grams: 1500,
    stock_status: 'in_stock',
    image_primary: JaggeryImages.gift,
    images_json: [
      JaggeryImages.gift,
      JaggeryImages.hero,
      JaggeryImages.nolen
    ],
    is_featured: 1,
    is_active: 1,
    meta_title_bn: 'ফুড ঘর রাজকীয় গুড় উপহার বক্স — ফুড ঘর',
    meta_desc_bn: 'পাটালি ও নলেন গুড়ের প্রিমিয়াম উপহার বক্স। ১৫০০ গ্রাম।'
  }
];

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    customer_name_bn: 'রহিমা সুলতানা',
    customer_location_bn: 'বনানী, ঢাকা',
    quote_bn: 'শৈশবে গ্রামের বাড়িতে যে গুড়ের সুবাস পেতাম, ফুড ঘরের নলেন গুড়ে ঠিক সেই মন জুড়ানো ঘ্রাণ পেলাম। পায়েস বানিয়ে পরিবারের সবাই অবাক হয়ে গেছে! কোনো চিনির মিষ্টি গন্ধ ছিল না, শুধুই খাঁটি রসের সুবাস।',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    sort_order: 1,
    is_active: 1
  },
  {
    id: 2,
    customer_name_bn: 'মাহবুব আলম',
    customer_location_bn: 'ধানমন্ডি, ঢাকা',
    quote_bn: 'চিনি মেশানো নকল গুড় খেয়ে খেয়ে বিশ্বাস হারিয়ে ফেলেছিলাম। ফুড ঘরের পাটালি মুখে দিতেই বোঝা যায় খাঁটি রস গাঢ় করে তৈরি। এই মানের পণ্যের জন্য একটু বাড়তি দাম দেওয়া স্বার্থক। নিয়মিত নিচ্ছি।',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    sort_order: 2,
    is_active: 1
  },
  {
    id: 3,
    customer_name_bn: 'ফারহানা ইয়াসমিন',
    customer_location_bn: 'পাঁচলাইশ, চট্টগ্রাম',
    quote_bn: 'প্যাকেজিং খুব চমৎকার ছিল। গুড় একটুও ভাঙেনি বা বাতাস লাগেনি। ডেলিভারির সময় দেখে ও ঘ্রাণ নিয়ে নেওয়ার সুযোগ আমাকে ভরসা দিয়েছে। এ বছর শীতে এটাই আমার সেরা কেনাকাটা।',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    sort_order: 3,
    is_active: 1
  },
  {
    id: 4,
    customer_name_bn: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
    customer_location_bn: 'উত্তরা সেক্টর ৭, ঢাকা',
    quote_bn: 'আমার ডায়াবেটিসের কারণে ডাক্তার চিনির ব্যাপারে সতর্ক করেছেন। লাল চায়ের সাথে এই দানাদার খেজুর গুড় আমার প্রতিদিনের সঙ্গী। নিখুঁত স্বাদ এবং স্বাস্থ্যসম্মত প্যাকেজিং।',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    sort_order: 4,
    is_active: 1
  },
  {
    id: 5,
    customer_name_bn: 'সানজিদা ইসলাম',
    customer_location_bn: 'উপশহর, সিলেট',
    quote_bn: 'আমরা মিষ্টি তৈরির ক্যাফে চালাই। ফুড ঘর থেকে ১০ কেজি নলেন গুড় অর্ডার করেছিলাম ট্রায়াল হিসেবে। মিষ্টির টেক্সচার আর ঘ্রাণে কাস্টমাররা দারুণ প্রশংসা করেছেন। এখন প্রতি সপ্তাহে নিচ্ছি।',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    sort_order: 5,
    is_active: 1
  }
];
