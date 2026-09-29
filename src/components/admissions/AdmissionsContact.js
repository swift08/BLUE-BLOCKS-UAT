"use client";

import ContactDetails from "@/components/blocks/ContactDetails";

const CONTACT_PROPS = {
  eyebrow: "CONTACT",
  heading: "Get in touch",
  items: [
    {
      icon: "/icon/email.svg",
      label: "EMAIL",
      value: "info@blueblocks.in",
      href: "mailto:info@blueblocks.in",
    },
    {
      icon: "/icon/phone.svg",
      label: "PHONE",
      value: "+91 9000955050",
      href: "tel:+919000955050",
    },
    {
      icon: "/icon/chat.svg",
      label: "WHATSAPP",
      value: "+91 9000955053",
      href: "https://wa.me/919000955053",
    },
  ],
  form: {
    buttonLabel: "Submit →",
    successMessage: "Thanks! We’ll get back to you shortly.",
    submittingLabel: "Submitting...",
    hubspot: {
      portalId: "245638953",
      formId: "a17fd9db-ad78-4dbf-8215-a9e29e801bea",
      pageName: "Admissions Page",
      pageUri: "/admissions/",
    },
    fields: [
      { name: "name", type: "text", placeholder: "Name", required: true },
      {
        name: "email",
        type: "email",
        placeholder: "Email",
        required: true,
        validate: "email",
      },
      { name: "phone", type: "text", placeholder: "Contact Number" },
      { name: "age_of_the_child", type: "text", placeholder: "Age of the Child" },
      { name: "message", type: "textarea", placeholder: "Message", required: true },
    ],
  },
};

export default function AdmissionsContact() {
  return (
    <section id="contact" className="scroll-mt-32">
      {/* Ready to start — existing CTA content, repositioned */}
      <div className="bg-[#0f172a] text-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[var(--bb-container)] px-[var(--bb-container-pad)] text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase">
            Ready to Start the Conversation?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Our admissions process is high-touch and is limited and filled on a first-aligned, first-served basis.
          </p>
          <a
            href="#contact-form"
            className="mt-8 inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#2C2F8F] text-sm font-bold uppercase tracking-wide hover:bg-[#F3E3CF] transition-colors"
          >
            Begin Your Journey
          </a>
        </div>
      </div>

      {/* Get in touch — existing form/details, no content changes */}
      <div id="contact-form">
        <ContactDetails {...CONTACT_PROPS} />
      </div>
    </section>
  );
}
