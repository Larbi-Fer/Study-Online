import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CodingSapce from "@/components/CodingSpace";

export const metadata: Metadata = {
  title: 'Dashboard'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar type="user" />
      {children}
    </>
  );
}
