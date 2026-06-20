export interface CafeEvent {
  id: string;
  name: string;
  date: string;         // ISO date string, e.g. "2025-08-15"
  description?: string;
  image?: string;
}

// Dates relative to ~mid-2025 so 3 are upcoming and 1 is in the past
export const cafeEvents: CafeEvent[] = [
  {
    id: 'event-01',
    name: 'Live Acoustic Night',
    date: '2025-08-15',
    description: 'Join us for a cosy evening of live acoustic sets by local artists. Free entry — just grab a drink and settle in.',
    image: 'https://picsum.photos/seed/acousticnight/600/400',
  },
  {
    id: 'event-02',
    name: 'Open Mic Thursday',
    date: '2025-08-21',
    description: 'Got a song, poem, or stand-up routine? Our stage is yours every third Thursday of the month.',
    image: 'https://picsum.photos/seed/openmic/600/400',
  },
  {
    id: 'event-03',
    name: 'Latte Art Workshop',
    date: '2025-09-06',
    description: 'Learn the basics of microfoam and pour technique directly from our head barista. Limited to 10 seats — book early!',
    image: 'https://picsum.photos/seed/latteart/600/400',
  },
  {
    id: 'event-04',
    name: 'Weekend Brunch Specials',
    date: '2025-07-20',  // past event
    description: 'We ran a one-day brunch pop-up featuring guest chef specials and bottomless cold brew. Thanks to everyone who came!',
    image: 'https://picsum.photos/seed/brunchspecial/600/400',
  },
];
