import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Emil Akerman - Mobile App Developer',
  description: 'Portfolio of Emil Akerman, a mobile app developer specializing in React Native, Flutter, and cross-platform development.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable} style={{ fontFamily: 'var(--font-inter)' }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
