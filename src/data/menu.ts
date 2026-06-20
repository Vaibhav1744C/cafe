export interface MenuItem {
  id: string;
  name: string;
  price: number;        // in local currency units (integer, e.g. INR paise → rupees)
  description: string;
  image: string;        // URL to image (WebP or picsum placeholder)
  category: string;
  isSoldOut?: boolean;
  isSignature?: boolean;
}

export const CATEGORIES = ['Coffee', 'Food', 'Desserts', 'Beverages'] as const;
export type Category = (typeof CATEGORIES)[number];

export const menuItems: MenuItem[] = [
  // ── Coffee ──────────────────────────────────────────────────────────────
  {
    id: 'coffee-01',
    name: 'Signature Espresso',
    price: 120,
    description: 'A rich, velvety double shot pulled from our house-blend beans — the soul of every cup we serve.',
    image: 'https://picsum.photos/seed/espresso/400/300',
    category: 'Coffee',
    isSignature: true,
  },
  {
    id: 'coffee-02',
    name: 'Bloom Latte',
    price: 180,
    description: 'Silky steamed milk poured over a double espresso with a delicate rosette on top.',
    image: 'https://picsum.photos/seed/latte/400/300',
    category: 'Coffee',
    isSignature: true,
  },
  {
    id: 'coffee-03',
    name: 'Cold Brew',
    price: 200,
    description: 'Steeped for 18 hours in cold water for a smooth, low-acid concentrate served over ice.',
    image: 'https://picsum.photos/seed/coldbrew/400/300',
    category: 'Coffee',
    isSignature: true,
  },
  {
    id: 'coffee-04',
    name: 'Flat White',
    price: 160,
    description: 'A ristretto-based coffee with a thin microfoam cap — stronger and smaller than a latte.',
    image: 'https://picsum.photos/seed/flatwhite/400/300',
    category: 'Coffee',
  },
  {
    id: 'coffee-05',
    name: 'Dalgona Whip',
    price: 210,
    description: 'Whipped instant coffee foam floated over chilled oat milk — indulgent and Instagram-worthy.',
    image: 'https://picsum.photos/seed/dalgona/400/300',
    category: 'Coffee',
    isSoldOut: true,
  },

  // ── Food ────────────────────────────────────────────────────────────────
  {
    id: 'food-01',
    name: 'Sourdough Avocado Toast',
    price: 280,
    description: 'House-baked sourdough topped with smashed avocado, cherry tomatoes, and a sprinkle of chilli flakes.',
    image: 'https://picsum.photos/seed/avocadotoast/400/300',
    category: 'Food',
    isSignature: true,
  },
  {
    id: 'food-02',
    name: 'Butter Croissant',
    price: 140,
    description: 'Flaky, golden layers of all-butter French pastry baked fresh every morning.',
    image: 'https://picsum.photos/seed/croissant/400/300',
    category: 'Food',
  },
  {
    id: 'food-03',
    name: 'Egg & Cheese Panini',
    price: 220,
    description: 'Scrambled free-range eggs with cheddar and herbs, pressed in ciabatta until golden and melty.',
    image: 'https://picsum.photos/seed/panini/400/300',
    category: 'Food',
  },
  {
    id: 'food-04',
    name: 'Overnight Oats',
    price: 190,
    description: 'Rolled oats soaked in almond milk overnight, served with seasonal fruit and honey.',
    image: 'https://picsum.photos/seed/overnightoats/400/300',
    category: 'Food',
    isSoldOut: true,
  },

  // ── Desserts ────────────────────────────────────────────────────────────
  {
    id: 'dessert-01',
    name: 'Tiramisu Jar',
    price: 240,
    description: 'Classic Italian layers of espresso-soaked ladyfingers and mascarpone cream in a charming jar.',
    image: 'https://picsum.photos/seed/tiramisu/400/300',
    category: 'Desserts',
  },
  {
    id: 'dessert-02',
    name: 'Matcha Cheesecake Slice',
    price: 260,
    description: 'No-bake cheesecake with a buttery biscuit base and earthy matcha swirl — a crowd favourite.',
    image: 'https://picsum.photos/seed/matchacake/400/300',
    category: 'Desserts',
  },
  {
    id: 'dessert-03',
    name: 'Chocolate Lava Brownie',
    price: 220,
    description: 'Dense, fudgy brownie with a warm chocolate centre, served with a scoop of vanilla bean ice cream.',
    image: 'https://picsum.photos/seed/brownie/400/300',
    category: 'Desserts',
  },

  // ── Beverages ───────────────────────────────────────────────────────────
  {
    id: 'bev-01',
    name: 'Fresh Mint Lemonade',
    price: 150,
    description: 'Hand-squeezed lemons blended with fresh garden mint and a touch of honey over crushed ice.',
    image: 'https://picsum.photos/seed/lemonade/400/300',
    category: 'Beverages',
  },
  {
    id: 'bev-02',
    name: 'Mango Lassi',
    price: 170,
    description: 'Creamy, chilled blend of ripe Alphonso mangoes and yoghurt — summer in a glass.',
    image: 'https://picsum.photos/seed/lassi/400/300',
    category: 'Beverages',
  },
];
