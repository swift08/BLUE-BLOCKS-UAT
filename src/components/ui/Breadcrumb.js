"use client";
/**
 * Breadcrumb.js — Accessible, SEO-friendly breadcrumb navigation.
 *
 * Renders a visible <nav> with <ol>/<li> structure and emits matching
 * BreadcrumbList JSON-LD inline. Styled with BlueBlocks design tokens.
 *
 * Usage:
 *   import Breadcrumb from "@/components/ui/Breadcrumb";
 *
 *   <Breadcrumb
 *     items={[
 *       { label: "Home", href: "/" },
 *       { label: "Programs", href: "/programs" },
 *       { label: "Playgroup" },  // last item — no href
 *     ]}
 *   />
 */

import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";

const SITE_URL = "https://www.blueblocks.in";

export default function Breadcrumb({ items = [], className = "" }) {
  if (!items.length) return null;

  // Build BreadcrumbList JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href
        ? {
            item: `${SITE_URL}${item.href.startsWith("/") ? item.href : `/${item.href}`}`,
          }
        : {}),
    })),
  };

  return (
    <>
      {/* Inline JSON-LD for this breadcrumb trail */}
      <JsonLd id={`breadcrumb-jsonld-${items.map((i) => i.label).join("-")}`} data={schema} />

      <nav
        aria-label="Breadcrumb"
        className={`bb-breadcrumb ${className}`}
      >
        <ol
          className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li
                key={i}
                className="flex items-center gap-x-1.5"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {/* Separator — hidden from screen readers */}
                {i > 0 && (
                  <span aria-hidden="true" className="text-slate-400 select-none">
                    /
                  </span>
                )}

                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-slate-900 font-medium"
                    itemProp="name"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className="text-slate-500 hover:text-slate-800 transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(i + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
