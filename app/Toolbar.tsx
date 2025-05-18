'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Toolbar() {
  const pathname = usePathname();
  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm mb-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-14 gap-4">
        <Link
          href="/"
          className={`px-3 py-1.5 rounded font-medium transition-colors ${pathname === "/" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
        >
          Catalog
        </Link>
        <Link
          href="/chat"
          className={`px-3 py-1.5 rounded font-medium transition-colors ${pathname.startsWith("/chat") ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
        >
          Chat
        </Link>
      </div>
    </nav>
  );
} 