import { WHATSAPP_NUMBER, WORD_BIT_X, SITE } from "./data/site";

export type WhatsAppItem = { name: string; qty: number; unit: number };

/* Builds a wa.me link carrying a structured order message. */
export function buildWhatsAppOrderLink(opts: {
  name: string;
  items: WhatsAppItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  service: string;
  address?: string;
  area?: string;
  phone?: string;
  note?: string;
}) {
  const lines = [
    `*New Order — ${SITE.name}*`,
    `--------------------------`,
    ...opts.items.map(
      (i) => `• ${i.name} x${i.qty} — PKR ${(i.unit * i.qty).toLocaleString("en-PK")}`
    ),
    `--------------------------`,
    `Subtotal: PKR ${opts.subtotal.toLocaleString("en-PK")}`,
    `Delivery: ${opts.deliveryFee === 0 ? "—" : "PKR " + opts.deliveryFee.toLocaleString("en-PK")}`,
    ...(opts.discount > 0
      ? [`Discount: −PKR ${opts.discount.toLocaleString("en-PK")}`]
      : []),
    `*Total: PKR ${opts.total.toLocaleString("en-PK")}*`,
    `--------------------------`,
    `Name: ${opts.name || "—"}`,
    `Service: ${opts.service}`,
    ...(opts.area ? [`Area: ${opts.area}`] : []),
    ...(opts.address ? [`Address: ${opts.address}`] : []),
    ...(opts.phone ? [`Phone: ${opts.phone}`] : []),
    ...(opts.note ? [`Note: ${opts.note}`] : []),
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export const whatsappChatLink = (message = "Assalam-o-Alaikum! I would like to place an order.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/* WordbitX lines — PK is primary, USA serves international clients. */
export const wordbitxWhatsAppLink = (message = "Assalam-o-Alaikum! I would like to discuss a project with WordbitX.") =>
  `https://wa.me/${WORD_BIT_X.phones.pk.wa}?text=${encodeURIComponent(message)}`;

export const wordbitxUsWhatsAppLink = (message = "Hello WordbitX! I would like to discuss a project.") =>
  `https://wa.me/${WORD_BIT_X.phones.us.wa}?text=${encodeURIComponent(message)}`;
