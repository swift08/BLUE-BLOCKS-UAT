import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import { notFound } from "next/navigation";

export const dynamicParams = false;

/* ---------- helpers ---------- */
const normalizeSlug = (v = "") =>
  String(v).trim().replace(/^\/+/, "").replace(/\/+$/, "");

const isValidPageNode = (node) =>
  node && typeof node === "object" && Array.isArray(node.sections) && node.sections.length > 0;

const getPage = (pages, slug) => {
  const s = normalizeSlug(slug);
  return pages?.[s] || pages?.[`${s}/`] || null;
};

/* ---------- static params ---------- */
export async function generateStaticParams() {
  const pages = siteData?.pages?.innovationDetail ?? {};

  return Object.entries(pages)
    .filter(([key, val]) => isValidPageNode(val)) // ✅ filters out breadcrumbs/schema
    .map(([key]) => ({ slug: normalizeSlug(key) }));
}

/* ---------- page ---------- */
export default function InnovationDetailPage({ params }) {
  const slug = normalizeSlug(params?.slug);

  const pages = siteData?.pages?.innovationDetail ?? {};
  const page = getPage(pages, slug);

  if (!isValidPageNode(page)) {
    notFound();
  }

  return <SectionRenderer sections={page.sections} />;
}
