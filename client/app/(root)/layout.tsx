import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { getUserData } from "@/lib/serverUtils";

export const metadata: Metadata = {
  title: 'Dashboard'
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserData()
  return (
    <>
      <Navbar type={user?.role === 'code_reviewer' ? 'reviewer' : 'student'} />
      {children}
    </>
  );
}
