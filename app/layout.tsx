import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react"

import localFont from "next/font/local";
import { auth } from "@/auth";

const ipmPlexSans = localFont({
  src: [
    { path: '/fonts/IBMPlexSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: '/fonts/IBMPlexSans-Medium.ttf', weight: '500', style: 'normal' },
    { path: '/fonts/IBMPlexSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '/fonts/IBMPlexSans-Bold.ttf', weight: '700', style: 'normal' },
  ]
});

const bebasNeue = localFont({
  src: [
    { path: '/fonts/BebasNeue-Regular.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--bebas-neue',
})

export const metadata: Metadata = {
  title: "Bookwise",
  description: "Bookwise is a book borrowing university management solution.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ipmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}

export default RootLayout;
