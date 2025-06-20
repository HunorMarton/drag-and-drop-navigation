import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page Navigation Demo",
  description: "A drag-and-drop page navigation component demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
