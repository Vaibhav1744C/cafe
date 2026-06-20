/**
 * Represents a single item in the cart.
 * Mirrors the CartItem interface from useCart — imported here to avoid
 * a circular dependency (useCart depends on whatsapp utilities).
 */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

/**
 * Builds a pre-filled WhatsApp order message from cart contents.
 *
 * Example output:
 * 🛒 Order from Table 4
 * • Espresso x2 – ₹240
 * • Croissant x1 – ₹140
 * Total: ₹380
 */
export function buildOrderMessage(
  items: CartItem[],
  tableId: string | null,
): string {
  const header = tableId
    ? `🛒 Order from Table ${tableId}`
    : '🛒 New Order';

  const lines = items.map(
    (item) => `• ${item.name} x${item.qty} – ₹${item.price * item.qty}`,
  );

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const footer = `Total: ₹${total}`;

  return [header, ...lines, footer].join('\n');
}

/**
 * Builds a pre-filled WhatsApp reservation message.
 *
 * Example output:
 * 📅 Reservation Request
 * Name: Priya S.
 * Party: 4
 * Time: 2025-08-15 19:30
 * Notes: Window seat preferred
 */
export function buildReservationMessage(
  name: string,
  partySize: number,
  datetime: string,
  notes: string,
): string {
  const lines = [
    '📅 Reservation Request',
    `Name: ${name}`,
    `Party: ${partySize}`,
    `Time: ${datetime}`,
  ];

  if (notes.trim()) {
    lines.push(`Notes: ${notes.trim()}`);
  }

  return lines.join('\n');
}

/**
 * Opens WhatsApp with a pre-filled message.
 * Navigates to: https://wa.me/<phoneNumber>?text=<encoded message>
 */
export function openWhatsApp(phoneNumber: string, message: string): void {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
}
