import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import "./globals.css";
import { cn } from "@/lib/utils";

const IBMPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Imaginify",
  description: "AI-powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cn("font-IBMPlex antialiased", IBMPlexSans.variable)}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         <ClerkProvider appearance={{
          variables: { colorPrimary: '#624cf5' }
         }}>
          {/* <header className="flex justify-end items-center p-4 gap-4 h-16">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header> */}
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
