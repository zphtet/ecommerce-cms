import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
import { DeleteContextProvider } from "@/context/DeleteContext";
export const metadata: Metadata = {
  title: "Ecommerce-CMS",
  description: "dashboard for your ecommerce store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <QueryProvider> */}

      <ClerkProvider>
        <body className={inter.className}>
          <DeleteContextProvider>
            <Toaster />
            {children}
          </DeleteContextProvider>
        </body>
      </ClerkProvider>
      {/* </QueryProvider> */}
    </html>
  );
}
