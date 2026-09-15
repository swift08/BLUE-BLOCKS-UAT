"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";

export default function HeaderShell() {
  const pathname = usePathname();

  // Home and the dark cinematic video catalog need light (white) nav text.
  const isVideoCatalog =
    pathname === "/video-catalog" || pathname === "/video-catalog/";
  const variant = pathname === "/" || isVideoCatalog ? "light" : "dark";

  return <Header variant={variant} />;
}