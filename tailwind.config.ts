import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'search-icon': "url('icons/search-icon.svg')",
      },
      backgroundPosition: {
        'left-16': '16px center',
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat',
      },
      colors: {
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F9FAFB',
        'bg-tertiary': 'var(--background)',
        'text-primary': '#101828',
        'text-tertiary': '#475467',
        'text-secondary': '#344054',
        'button-primary-fg': '#FFFFFF',
        'button-primary-bg': '#7F56D9',
        'button-primary-border': '#7F56D9',
        'button-secondary-fg': '#344054',
        'button-secondary-bg': '#FFFFFF',
        'button-secondary-border': '#D0D5DD',
        'border-primary': '#D0D5DD',
        'border-secondary': '#EAECF0',
        'button-secondary-color-fg': '#6941C6',
        'button-secondary-color-bg': '#FFFFFF',
        'button-secondary-color-border': '#D6BBFB',
        'button-tertiary-fg': '#475467',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
export default config;
