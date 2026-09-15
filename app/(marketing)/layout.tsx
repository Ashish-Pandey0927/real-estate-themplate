// app/layout.tsx
import '../globals.css'
import Navbar from "../../components/layout/Navbar";
import CloudLayer from "../../components/layout/CloudLayer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url('/bg-sky.jpg')] bg-cover bg-center -z-20" />
      {/* <CloudLayer /> */}
      <div className="relative z-20">
        <Navbar />
        {children}
      </div>
    </div>
  );
}