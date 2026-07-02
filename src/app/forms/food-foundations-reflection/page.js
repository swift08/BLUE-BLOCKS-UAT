import BbmriForm from "@/components/forms/BbmriForm";

export const metadata = {
  title: "Food Foundations Reflection | BBMRI",
  description: "A reflection questionnaire for parents.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BigFormPage() {
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
