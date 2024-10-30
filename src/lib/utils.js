import { ClassValue, clsx } from 'clsx';
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

export function formatCurrency(amount, locale = 'de-US') {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'KWD',
  }).format(amount);

  return locale.includes('de') ? formatted.replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.') : formatted;
}

