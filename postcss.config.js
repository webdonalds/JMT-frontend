import tailwindcss from 'tailwindcss';

export const plugins = [
  tailwindcss('./tailwind.config.ts'),
  require('autoprefixer'),
];
