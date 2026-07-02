import BbmriForm5Q from "@/components/forms/BbmriForm5Q";

export const metadata = {
  title: "Food Foundations Reflection - 5-Question Version | BBMRI",
  description: "A quick 5-question reflection questionnaire for parents.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SmallFormPage() {
  return (
    <div className="bb-ui min-h-screen bg-iceSoft">
      <style dangerouslySetInnerHTML={{
        __html: `
        #site-header, header, footer, a[href*="wa.me"] { display: none !important; }
        `
      }} />
      <BbmriForm5Q />
    </div>
  );
}
