import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'textSize-1',
        'textSize-2',
        'textSize-3',
        'textSize-4',
        'textSize-5',
        'textSize-6',
        'textSize-7',
        'textSize-8',
        'textSize-9',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
