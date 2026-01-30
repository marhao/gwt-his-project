import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ThemeProvider, AuthProvider, MenuProvider } from '@/components/providers';

export const metadata: Metadata = {
  title: 'Korat HIS | Hospital Information System',
  description: 'Modern Hospital Information System for healthcare management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <MenuProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}