export interface InstagramPost {
  id: string;
  imageUrl: string;
  postUrl: string;
  altText?: string;
}

export const instagramPosts: InstagramPost[] = [
  {
    id: 'ig-01',
    imageUrl: 'https://picsum.photos/seed/ig1/400/400',
    postUrl: 'https://www.instagram.com/p/placeholder-01/',
    altText: 'Bloom Latte with rosette art on a wooden table',
  },
  {
    id: 'ig-02',
    imageUrl: 'https://picsum.photos/seed/ig2/400/400',
    postUrl: 'https://www.instagram.com/p/placeholder-02/',
    altText: 'Sourdough avocado toast with cherry tomatoes',
  },
  {
    id: 'ig-03',
    imageUrl: 'https://picsum.photos/seed/ig3/400/400',
    postUrl: 'https://www.instagram.com/p/placeholder-03/',
    altText: 'Cosy cafe interior with warm lighting',
  },
  {
    id: 'ig-04',
    imageUrl: 'https://picsum.photos/seed/ig4/400/400',
    postUrl: 'https://www.instagram.com/p/placeholder-04/',
    altText: 'Cold brew served over ice in a tall glass',
  },
  {
    id: 'ig-05',
    imageUrl: 'https://picsum.photos/seed/ig5/400/400',
    postUrl: 'https://www.instagram.com/p/placeholder-05/',
    altText: 'Tiramisu jar dessert close-up',
  },
  {
    id: 'ig-06',
    imageUrl: 'https://picsum.photos/seed/ig6/400/400',
    postUrl: 'https://www.instagram.com/p/placeholder-06/',
    altText: 'Barista pulling an espresso shot',
  },
  {
    id: 'ig-07',
    imageUrl: 'https://picsum.photos/seed/ig7/400/400',
    postUrl: 'https://www.instagram.com/p/placeholder-07/',
    altText: 'Live acoustic night at Brew & Bloom',
  },
  {
    id: 'ig-08',
    imageUrl: 'https://picsum.photos/seed/ig8/400/400',
    postUrl: 'https://www.instagram.com/p/placeholder-08/',
    altText: 'Matcha cheesecake slice with a dusting of matcha powder',
  },
  {
    id: 'ig-09',
    imageUrl: 'https://picsum.photos/seed/ig9/400/400',
    postUrl: 'https://www.instagram.com/p/placeholder-09/',
    altText: 'Weekend brunch spread at the cafe',
  },
];
