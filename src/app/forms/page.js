import Link from "next/link";

export const metadata = {
  title: "Food Foundations Reflection Options | BBMRI",
  description: "Select which reflection questionnaire you would like to complete.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FormsSelectionPage() {
  return (
    <div className="bb-ui min-h-screen bg-iceSoft flex items-center justify-center p-4">
      <style dangerouslySetInnerHTML={{
        __html: `
        #site-header, header, footer, a[href*="wa.me"] { display: none !important; }
        `
      }} />
      
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#1f3b82] mb-4">Food Foundations Reflection</h1>
          <p className="text-slate-600 text-lg">Please choose a reflection version to continue.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/forms/food-foundations-reflection/" className="bb-card bg-white hover:border-[#1f3b82] hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center p-8 border-2 border-transparent">
            <div className="w-16 h-16 bg-[#1f3b82]/10 text-[#1f3b82] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#1f3b82] group-hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Food Foundations Reflection</h2>
            <p className="text-slate-500 mb-6 flex-grow">Our comprehensive reflection tool for a deep dive into your child&apos;s eating habits.</p>
            <span className="text-[#1f3b82] font-medium group-hover:underline">Start Full Reflection &rarr;</span>
          </Link>

          <Link href="/forms/Foodfoundations/" className="bb-card bg-white hover:border-green-600 hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center p-8 border-2 border-transparent">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Food Foundations</h2>
            <p className="text-slate-500 mb-6 flex-grow">A quick, 2-minute version to discover your child&apos;s food foundations.</p>
            <span className="text-green-600 font-medium group-hover:underline">Start Food Foundations &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
