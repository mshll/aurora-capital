import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getGreeting() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return 'Good Morning';
  } else if (hours < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}

export function formatCurrency(amount, locale = 'en-KW') {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'KWD',
    notation: 'compact',
  }).format(amount);

  return formatted.replace('KWD', '') + ' KWD';
}
