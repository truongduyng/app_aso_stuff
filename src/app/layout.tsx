import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const font = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={font.className}>{children}</body>
    </html>
  );
}
