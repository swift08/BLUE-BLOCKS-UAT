"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BbmriForm5Q() {
  const [formData, setFormData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    childName: "",
    childAge: "",
    parentName: "",
    phone: "",
    email: "",
    address: "",
    source: "", sourceOther: "",
    consent: ""
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bbmri_form_5q_data");
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load saved form data", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bbmri_form_5q_data", JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  // Calculate progress based on filled sections/fields
  useEffect(() => {
    const fieldsToTrack = [
      formData.q1, formData.q2, formData.q3, formData.q4, formData.q5,
      formData.childName, formData.childAge, formData.parentName, formData.phone, formData.email,
      formData.address, formData.source, formData.consent
    ];
    
    const filled = fieldsToTrack.filter(val => val !== "").length;
    const total = fieldsToTrack.length;
    setProgress(Math.round((filled / total) * 100));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const currentArr = prev[name];
        if (checked) {
          return { ...prev, [name]: [...currentArr, value] };
        } else {
          return { ...prev, [name]: currentArr.filter((item) => item !== value) };
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const reqText = "This field is required";

    if (!formData.q1) newErrors.q1 = reqText;
    if (!formData.q2) newErrors.q2 = reqText;
    if (!formData.q3) newErrors.q3 = reqText;
    if (!formData.q4) newErrors.q4 = reqText;
    if (!formData.q5) newErrors.q5 = reqText;
    
    if (!formData.childName.trim()) newErrors.childName = reqText;
    if (!formData.childAge.trim()) newErrors.childAge = reqText;
    if (!formData.parentName.trim()) newErrors.parentName = reqText;
    if (!formData.phone.trim()) newErrors.phone = reqText;
    if (!formData.email.trim()) {
      newErrors.email = reqText;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.address.trim()) newErrors.address = reqText;
    
    if (!formData.source) newErrors.source = reqText;
    if (formData.source === "Other" && !formData.sourceOther.trim()) newErrors.sourceOther = reqText;
    
    if (!formData.consent) newErrors.consent = reqText;

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      // Find first error and scroll to it
      const firstErrorKey = Object.keys(newErrors)[0];
      const errorElement = document.getElementById(`field-${firstErrorKey}`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");

    // Construct readable email text
    const messageBody = `
Food Foundations Reflection - 5-Question Version
Submission Date: ${new Date().toLocaleString()}

--- Parent Details ---
Parent Name: ${formData.parentName}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}
How they heard: ${formData.source === "Other" ? formData.sourceOther : formData.source}

--- Child Details ---
Child Name: ${formData.childName}
Age: ${formData.childAge}

--- Section 2: Mealtime Environment ---
Q1 (Worries most): ${formData.q1}
Q2 (New food appears): ${formData.q2}
Q3 (Eat across day): ${formData.q3}
Q4 (First feeling at meal): ${formData.q4}
Q5 (Who decides how much): ${formData.q5}

--- Section 4: Research Consent ---
Consent choice: ${formData.consent}
    `.trim();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "d51706c9-c8f1-4081-956d-254aa31caf8e"); // Reuse same key from big form
      formDataToSend.append("subject", `New 5Q Reflection Submission from ${formData.parentName}`);
      formDataToSend.append("from_name", formData.parentName);
      formDataToSend.append("replyto", formData.email);
      formDataToSend.append("message", messageBody);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        localStorage.removeItem("bbmri_form_5q_data"); // clear draft on success
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setStatus("error");
        console.error(result);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bb-card bg-white max-w-2xl w-full text-center shadow-xl shadow-slate-200/50"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🌱</span>
          </div>
          <h2 className="bb-section-title mb-6">Thank you! Your reflection is complete</h2>
          <div className="text-justify space-y-4 text-slate-700 leading-relaxed text-[15px]">
            <p>We&apos;re preparing your personalised report.</p>
            <p>You&apos;ll receive it on WhatsApp within 24–48 hours.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Helper renderers for form fields
  const renderError = (field) => {
    return AnimatePresence && errors[field] ? (
      <motion.p 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="text-red-500 text-sm mt-1.5"
      >
        {errors[field]}
      </motion.p>
    ) : null;
  };

  const renderRadioGroup = (name, options, withOther = false) => {
    return (
      <div className="space-y-3 mt-4" id={`field-${name}`}>
        {options.map((opt) => (
          <label key={opt} className={`flex items-start p-4 rounded-xl border cursor-pointer transition-all ${formData[name] === opt ? 'border-[#1f3b82] bg-[#1f3b82]/5' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
            <div className="flex items-center h-6">
              <input
                type="radio"
                name={name}
                value={opt}
                checked={formData[name] === opt}
                onChange={handleChange}
                className="w-5 h-5 text-[#1f3b82] focus:ring-[#1f3b82] border-slate-300"
              />
            </div>
            <div className="ml-3 text-slate-700 text-[15px]">{opt}</div>
          </label>
        ))}
        {withOther && (
          <div className="mt-2 pl-12 pr-4">
            <AnimatePresence>
              {formData[name] === "Other" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <input
                    id={`${name}Other`}
                    type="text"
                    name={`${name}Other`}
                    aria-label="Please specify"
                    placeholder="Please specify"
                    value={formData[`${name}Other`]}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#1f3b82] focus:border-[#1f3b82] outline-none transition-all ${errors[`${name}Other`] ? 'border-red-300' : 'border-slate-300'}`}
                  />
                  {renderError(`${name}Other`)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        {renderError(name)}
      </div>
    );
  };

  const renderInput = (name, label, type = "text", autoComplete = "off", ariaLabel = "") => (
    <div className="mt-4" id={`field-${name}`}>
      {label && <label htmlFor={name} className="block text-slate-700 font-medium mb-2">{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        autoComplete={autoComplete}
        aria-label={ariaLabel || (label ? label.replace("*", "").trim() : "")}
        className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-[#1f3b82] focus:border-[#1f3b82] outline-none transition-all ${errors[name] ? 'border-red-300' : 'border-slate-300 bg-white'}`}
      />
      {renderError(name)}
    </div>
  );

  return (
    <>
      {/* Sticky Progress Bar */}
      <div className="sticky top-0 z-50 w-full h-2 bg-slate-200">
        <motion.div 
          className="h-full bg-[#1f3b82]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </div>
      
      {/* Hero Section */}
      <section className="bb-section bg-[#1f3b82] text-white pt-20 pb-24 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="bb-hero-title">Food Foundations Reflection — 5-Question Version</h1>
          <h2 className="text-xl text-white/90 font-medium">Discover Your Child&apos;s Food Foundations (0–6 Years)</h2>
          
          <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm mt-8 text-justify space-y-4 text-white/90 leading-relaxed">
            <p>If mealtimes feel like a daily negotiation, you&apos;re not alone.</p>
            <p>Answer 5 quick questions and get a personalised report on your child&apos;s eating — within 24–48 hours.</p>
            <p>Most parents finish in under 2 minutes.</p>
          </div>
          <p className="text-white/70 text-sm pt-4 uppercase tracking-wider font-semibold">— Blue Blocks Micro Research Institute (BBMRI)</p>
        </div>
      </section>

      {/* Form Area */}
      <section className="bb-section -mt-8 px-4 pb-32">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-12" noValidate>
          
          {/* Section 2 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 2</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Mealtime Environment</h2>
            <p className="text-slate-600 mb-8 text-justify">There are no right or wrong answers. Simply choose the response closest to your family&apos;s everyday experience.</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q1. What worries you most about your child&apos;s eating right now? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q1", ["Not eating enough", "Picky eating", "Nutrition", "Weight gain", "Mealtime stress", "Screen dependence", "Lack of independence", "Nothing in particular"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q2. When a new food appears, what does your child do? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q2", ["Won't let it on the plate", "Lets it sit", "Touches or smells", "Tastes it", "Eats it"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q3. Roughly how does your child eat across a day? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q3", ["3 meals", "3 meals + snacks", "1–2 meals, picks", "Nibbles all day"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q4. When you picture your child at a meal, what&apos;s the first feeling? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q4", ["Joy", "Concern", "Frustration", "Exhaustion"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q5. At your table, who decides how much your child eats? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q5", ["I mostly decide", "We both influence it", "My child mostly decides", "I've never thought about it this way"])}
              </div>
            </div>
          </motion.div>

          {/* Section 3 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 3</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-8">Receive Your Personalised Reflection</h2>
            <p className="text-slate-600 mb-8 text-justify">Your details are used only to prepare and send your child&apos;s personalised Food Foundations report via WhatsApp. Your information is kept confidential, never shared or sold, and any use for research is fully anonymised.</p>
            
            <div className="space-y-4">
              {renderInput("childName", "Child's name *", "text", "off")}
              {renderInput("childAge", "How old is your child? (in years and months, e.g. 3 years 4 months) *", "text", "off")}
              {renderInput("parentName", "Parent name *", "text", "name")}
              {renderInput("phone", "Phone number (WhatsApp) *", "tel", "tel")}
              {renderInput("email", "Email Address *", "email", "email")}
              {renderInput("address", "Home Address (Area, Pincode) *", "text", "street-address")}
              
              <div className="mt-8 pt-4 border-t border-slate-100">
                <h3 className="font-medium text-lg text-slate-800">How did you hear about us? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("source", ["Instagram", "Facebook", "Google", "Friend", "School parent", "Workshop", "LinkedIn", "Other"], true)}
              </div>
            </div>
          </motion.div>

          {/* Section 4 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 4</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Research Consent</h2>
            <p className="text-slate-600 mb-8 text-justify">We never share anything that could identify you or your child. You&apos;ll receive your full personalised reflection whatever you choose.</p>
            
            <div>
              <h3 className="font-medium text-lg text-slate-800">Choose how you&apos;d like to receive your personalised AI report <span className="text-red-500">*</span></h3>
              {renderRadioGroup("consent", [
                "Option 1 (Free): Receive my personalised AI report FREE — I consent to my responses being used anonymously by BBMRI for research, publications, and improving future parent reports. My identity and my child's identity will never be disclosed.",
                "Option 2 (Private Report – ₹1,000): Receive my personalised AI report as a private report — my responses will be used only to generate my report and will not be included in BBMRI's research database or publications."
              ])}
            </div>
          </motion.div>

          {/* Submit Action */}
          <div className="pt-12 text-center">
            {status === "error" && (
              <p className="text-red-500 mb-4">There was an error submitting your form. Please try again.</p>
            )}
            {Object.keys(errors).length > 0 && (
              <p className="text-red-500 mb-4 font-medium">Please complete all required fields correctly before submitting.</p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="bb-btn bb-btn--primary px-12 py-4 text-lg font-semibold w-full sm:w-auto shadow-lg shadow-[#1f3b82]/30"
            >
              {status === "submitting" ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting Reflection...
                </>
              ) : "Submit Reflection"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
