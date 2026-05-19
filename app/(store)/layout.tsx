import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";

export default function StoreLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
      <div className="min-h-screen bg-gray-200">
        {children}
      </div>
  );
}