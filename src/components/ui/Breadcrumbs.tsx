"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowRightSLine, RiHome4Line } from "react-icons/ri";
import { JsonLd, breadcrumbListJsonLd } from "@/components/seo/JsonLd";

export type BreadcrumbItem = {
  label: string;
  href: string;
  active?: boolean;
};

const ROUTE_LABELS: Record<string, string> = {
  urunler: "Ürünler",
  hakkimizda: "Hakkımızda",
  iletisim: "İletişim",
  blog: "Blog",
  hizmetler: "Hizmetler",
  projeler: "Projeler",
};

export function Breadcrumbs({ items, className = "" }: { items?: BreadcrumbItem[], className?: string }) {
  const pathname = usePathname();
  
  // Eğer dışarıdan liste gelmezse current path'ten üret
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter((path) => path !== "");
    const breadcrumbs: BreadcrumbItem[] = paths.map((rawPath, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      const decodedPath = decodeURIComponent(rawPath).toLowerCase();
      
      let label = ROUTE_LABELS[decodedPath];
      if (!label) {
        label = decodedPath
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
      }
        
      return { label, href, active: index === paths.length - 1 };
    });
    return breadcrumbs;
  };

  const breadcrumbs = items || generateBreadcrumbs();

  if (pathname === "/") return null;

  return (
    <>
      <JsonLd data={breadcrumbListJsonLd(breadcrumbs)} />
      <nav aria-label="Breadcrumb" className={`flex items-center text-sm text-muted-foreground ${className}`}>
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link 
            href="/" 
            className="flex items-center hover:text-primary transition-colors gap-1"
            title="Ana Sayfa"
          >
            <RiHome4Line size={16} />
            <span className="sr-only">Ana Sayfa</span>
          </Link>
        </li>
        
        {breadcrumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-2">
            <RiArrowRightSLine size={14} className="text-muted-foreground/40 shrink-0" />
            {crumb.active ? (
              <span className="font-medium text-foreground truncate max-w-[200px]">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-primary transition-colors truncate max-w-[150px]"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
    </>
  );
}
