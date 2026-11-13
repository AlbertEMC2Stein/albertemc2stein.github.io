import "./globals.css";

export const metadata = {
  title: "Tim Prokosch — Design study",
  description: "A personal website for mathematics, research, and software.",
  icons: {
    icon: "/assets/images/tp-monogram.svg",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
