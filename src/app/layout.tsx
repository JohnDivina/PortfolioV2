import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';

export const metadata: Metadata = {
  title: 'John Rey L. Divina — Portfolio',
  description: 'John Rey L. Divina — IoT Engineer & Smart Agriculture Systems Developer based in Science City of Munoz, Philippines.',
  keywords: 'IoT engineer, ESP32, Arduino, smart agriculture, greenhouse automation, web developer, Philippines',
  authors: [{ name: 'John Rey L. Divina' }],
  icons: { icon: '/assets/favicon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
