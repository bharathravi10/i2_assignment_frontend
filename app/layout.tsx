import type { Metadata } from "next";
import ClientThemeProvider from "./ClientThemeProvider";
import DrawerAppBar from "@/components/main-layout";
import ClientProvider from "./ClientProvider";
import JWTProvider from "@/context/JwtContext";

// No need to mark this entire file with `"use client"` for SSR
export const metadata: Metadata = {
  title: "Take Your Notes",
  description: "Take notes like a pro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <ClientThemeProvider>
            <JWTProvider />
            <DrawerAppBar>{children}</DrawerAppBar>
          </ClientThemeProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
