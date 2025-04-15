import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { getUserData } from "@/lib/serverUtils";

export const metadata: Metadata = {
  title: {
    default: 'OSTE',
    template: '%s | OSTE'
  },
  description: "Online study and testing environment",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserData()
  return (
    <html lang="en" suppressHydrationWarning>
      {/* @ts-ignore */}
      <body style={{ '--topic-pramiry-color': user?.selectedTopic?.color || '#0059FF' }}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
