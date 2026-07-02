import { notFound } from "next/navigation";
import BbmriForm from "@/components/forms/BbmriForm";

export function generateStaticParams() {
  return [
    { slug: "food-foundations-reflection" }
  ];
}

export async function generateMetadata(props) {
  const params = await props.params;
  const slug = decodeURIComponent(params.slug);
  if (slug === "food-foundations-reflection") {
    return {
      title: "Food Foundations Reflection | BBMRI",
      description: "A reflection questionnaire for parents.",
      robots: { index: false, follow: false },
    };
  }
  return { title: "Not Found" };
}

export default async function SlugPage(props) {
  const params = await props.params;
  const slug = decodeURIComponent(params.slug);
  
  if (slug === "food-foundations-reflection") {
    return (
      <div className="bb-ui min-h-screen bg-iceSoft">
        <style dangerouslySetInnerHTML={{
          __html: `
          #site-header, header, footer, a[href*="wa.me"] { display: none !important; }
          `
        }} />
        <BbmriForm />
      </div>
    );
  }
  
  notFound();
}
