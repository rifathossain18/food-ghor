-- Seeds for categories (3 authentic Bengali jaggery categories)
INSERT INTO categories (id, slug, name_bn, description_bn, sort_order, is_active)
VALUES
  (1, 'patali-gur', 'পাটালি গুড়', 'যশোরের আদি পদ্ধতিতে মাটির চুলায় সতর্ক আঁচে তৈরি শক্ত পাটালি গুড়।', 1, 1),
  (2, 'nolen-gur', 'নলেন গুড় (তরল/ঝুলা)', 'পৌষের ভোরে সংগৃহীত তাজা রসের অতুলনীয় সুঘ্রাণযুক্ত ঝুলা নলেন গুড়।', 2, 1),
  (3, 'khejurer-dana-gur', 'দানাদার খেজুর গুড়', 'আদি খয়েরি রঙের ঐতিহ্যবাহী চুয়াডাঙ্গা ও যশোরের খাঁটি দানাদার গুড়।', 3, 1)
ON DUPLICATE KEY UPDATE name_bn=VALUES(name_bn);
