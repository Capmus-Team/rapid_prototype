// src/app/layout.tsx
import './globals.css';          // Optional: your own global CSS
import { Metadata } from 'next';
import { ReactNode } from 'react';

// Next.js 13 allows you to define page metadata like this:
export const metadata: Metadata = {
  title: 'Capmus Marketplace',
  description: 'A marketplace for university communities',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Google Material Icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        {/* Font Awesome */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        {/* Link to your static style.css in public folder */}
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        {/* The children below is where page.tsx (and other routes) render */}
        {children}
      </body>
    </html>
  );
}
