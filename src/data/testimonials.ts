export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;       // 1–5
  avatar?: string;      // URL to avatar image (optional)
}

export const testimonials: Testimonial[] = [
  {
    id: 'review-01',
    name: 'Priya S.',
    text: 'The Bloom Latte is genuinely the best coffee I\'ve had in the city. The rosette art alone is worth the visit. My new Monday ritual.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/avatar1/80/80',
  },
  {
    id: 'review-02',
    name: 'Arjun M.',
    text: 'Came for the cold brew, stayed for the sourdough toast. The vibe is incredible — quiet enough to work but lively enough to feel alive.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/avatar2/80/80',
  },
  {
    id: 'review-03',
    name: 'Sarah K.',
    text: 'Attended the Latte Art Workshop and it was so much fun! The barista team is patient and genuinely passionate. Highly recommend.',
    rating: 5,
  },
  {
    id: 'review-04',
    name: 'Rohan D.',
    text: 'Great spot for a weekend brunch. The tiramisu jar is a must-order. Would love to see a larger dessert menu.',
    rating: 4,
    avatar: 'https://picsum.photos/seed/avatar4/80/80',
  },
  {
    id: 'review-05',
    name: 'Meera T.',
    text: 'Love the aesthetic and the playlist. The matcha cheesecake is out of this world. Staff is always warm and welcoming.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/avatar5/80/80',
  },
  {
    id: 'review-06',
    name: 'Vikram J.',
    text: 'Solid espresso and a cosy corner by the window — perfect for remote work. Reliable wifi is a huge plus.',
    rating: 4,
  },
];
