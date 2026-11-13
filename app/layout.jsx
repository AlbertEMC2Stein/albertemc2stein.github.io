import "./globals.css";

export const metadata = {
  title: "Tim Prokosch — Design study",
  description: "A personal website for mathematics, research, and software.",
  icons: {
    icon: "/assets/images/tp-monogram.svg?v=2",
    shortcut: "/favicon.ico?v=2",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
