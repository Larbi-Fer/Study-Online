import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CodingSapce from "@/components/CodingSpace";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Dashboard'
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const userId = (await cookies()).get('userId');
  // if (!userId) return redirect('/login');
  return (
    <>
      <Navbar type="user" />
      {children}
    </>
  );
}
