import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: 'Challenges',
    template: '%s | Chellenge'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children
}
