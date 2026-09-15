// app/layout.tsx
import './globals.css'
import Navbar from "../components/layout/Navbar";
import Preloader from "../components/Preloader";
import LenisProvider from "../components/LenisProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Preloader />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}