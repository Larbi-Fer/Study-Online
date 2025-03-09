import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: 'Lessons',
    template: '%s | Lesson'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children
}
