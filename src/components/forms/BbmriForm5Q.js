"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BbmriForm5Q() {
  const [formData, setFormData] = useState({
    q1: "", q1Other: "",
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

  const [showConfirm, setShowConfirm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const cancelBtnRef = useRef(null);

  const initialFormState = {
    q1: "", q1Other: "",
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
  };

  const handleClearClick = () => {
    setShowConfirm(true);
  };

  const confirmClear = () => {
    setFormData(initialFormState);
    setErrors({});
    setStatus("idle");
    localStorage.removeItem("bbmri_form_5q_data");
    
    // Smooth scroll back to top of form
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Focus on the first question input
    setTimeout(() => {
      const firstInput = document.querySelector('input[name="q1"]');
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);

    setShowConfirm(false);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Close confirmation modal on Escape key
  useEffect(() => {
    if (!showConfirm) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowConfirm(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showConfirm]);

  // Focus Cancel button when confirmation modal opens
  useEffect(() => {
    if (showConfirm && cancelBtnRef.current) {
      cancelBtnRef.current.focus();
    }
  }, [showConfirm]);

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

  const fieldLabels = {
    q1: "Q1. What worries you most about your child's eating right now?",
    q1Other: "Q1. Other specification",
    q2: "Q2. When your child sees a completely new food, what usually happens first?",
    q3: "Q3. Which statement sounds most like your child?",
    q4: "Q4. When your child says, 'I'm full', what do you usually do?",
    q5: "Q5. Which statement best describes mealtimes in your home?",
    childName: "Child's name",
    childAge: "How old is your child?",
    parentName: "Parent name",
    phone: "Phone number (WhatsApp)",
    email: "Email Address",
    address: "Home Address",
    source: "How did you hear about us?",
    sourceOther: "How did you hear about us? (Other specification)",
    consent: "Research Consent"
  };

  const validateForm = () => {
    const newErrors = {};
    const reqText = "This field is required";

    if (!formData.q1) newErrors.q1 = reqText;
    if (formData.q1 === "Other" && !formData.q1Other.trim()) newErrors.q1Other = reqText;
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
      const errorElement = document.getElementById(`field-${firstErrorKey}`) || document.getElementById(firstErrorKey);
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
Q1 (Worries most): ${formData.q1 === "Other" ? formData.q1Other : formData.q1}
Q2 (Response to new food): ${formData.q2 || "Not answered"}
Q3 (Child eating statement): ${formData.q3 || "Not answered"}
Q4 (Action when child says "I'm full"): ${formData.q4}
Q5 (Mealtime description/screens): ${formData.q5 || "Not answered"}

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
      <div className="min-h-screen py-16 px-4 flex items-center justify-center bg-[#faf9f7]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white max-w-2xl w-full text-center shadow-xl shadow-slate-200/50 rounded-2xl p-6 md:p-10"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🌱</span>
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-900 mb-6 leading-tight text-center">Thank you for completing your Food Foundations Reflection.</h2>
          <div className="text-justify space-y-4 text-slate-700 leading-relaxed text-[15px]">
            <p>We&apos;re now preparing your personalised report using your responses.</p>
            <p>Within the next 24–48 hours you&apos;ll receive practical insights into your child&apos;s eating patterns, emerging strengths, and gentle Montessori-informed ideas to support happier mealtimes.</p>
            <p>Keep an eye on your WhatsApp—we&apos;re looking forward to sharing your reflection with you.</p>
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
            <p>Parents often worry about how much their child eats.</p>
            <p>Sometimes the more important question is how they eat.</p>
            <p>Answer 5 quick questions and receive a personalised Food Foundations Report within 24–48 hours.</p>
            <p>Most parents finish in under 2 minutes.</p>
          </div>
          <p className="text-white/70 text-sm pt-4 uppercase tracking-wider font-semibold">— Blue Blocks Micro Research Institute (BBMRI)</p>
        </div>
      </section>

      {/* Form Area */}
      <section className="bb-section -mt-8 px-4 pb-32">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-12" noValidate>
          
          {/* Section 1 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 1</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Mealtime Environment</h2>
            <p className="text-slate-600 mb-8 text-justify">There are no right or wrong answers. Simply choose the response closest to your family&apos;s everyday experience.</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q1. What worries you most about your child&apos;s eating right now? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q1", [
                  "Doesn't eat enough",
                  "Eats only a few favourite foods",
                  "Doesn't try new foods",
                  "Mealtimes are stressful",
                  "Too dependent on screens or distractions",
                  "Not yet independent during meals",
                  "I'm concerned about nutrition",
                  "Nothing in particular",
                  "Other"
                ], true)}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q2. When your child sees a completely new food, what usually happens first? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q2", [
                  "Refuses it immediately",
                  "Watches it carefully",
                  "Touches or smells it",
                  "Takes a tiny taste",
                  "Starts eating it"
                ])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q3. Which statement sounds most like your child? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q3", [
                  "Eats fairly consistently each day.",
                  "Eats a lot one day and very little the next.",
                  "Usually prefers snacks over meals.",
                  "Grazes throughout the day.",
                  "Appetite is difficult to predict."
                ])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q4. When your child says, &quot;I&apos;m full,&quot; what do you usually do? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q4", [
                  "I trust them and end the meal.",
                  "I encourage a few more bites.",
                  "I ask them to finish most of the meal.",
                  "I offer another favourite food.",
                  "It depends."
                ])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q5. Which statement best describes mealtimes in your home? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q5", [
                  "We never use screens during meals.",
                  "Screens are used occasionally.",
                  "Screens are sometimes used to help my child eat.",
                  "My child usually eats while watching a screen.",
                  "My child finds it difficult to eat without a screen."
                ])}
              </div>
            </div>
          </motion.div>

          {/* Section 2 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 2</div>
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

          {/* Section 3 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 3</div>
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
          <div className="pt-12 text-left sm:text-center">
            {status === "error" && (
              <p className="text-red-500 mb-4 text-center">There was an error submitting your form. Please try again.</p>
            )}
            
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl mb-8 shadow-sm text-left max-w-3xl mx-auto">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-red-800">Please answer all required questions</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p className="mb-2 font-medium">The following questions or fields are unanswered or invalid. Click on a question to go directly to it:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {Object.keys(errors).map((key) => {
                          const label = fieldLabels[key] || key;
                          return (
                            <li key={key}>
                              <button
                                type="button"
                                onClick={() => {
                                  const el = document.getElementById(`field-${key}`) || document.getElementById(key);
                                  if (el) {
                                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                                    setTimeout(() => {
                                      const input = el.querySelector("input, select, textarea");
                                      if (input) input.focus();
                                    }, 500);
                                  }
                                }}
                                className="text-left hover:underline text-red-700 hover:text-red-900 font-medium cursor-pointer focus:outline-none"
                              >
                                {label}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="bb-btn bb-btn--primary px-12 py-4 text-lg font-semibold w-full sm:w-auto shadow-lg shadow-[#1f3b82]/30 order-1 sm:order-2"
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
              <button
                type="button"
                onClick={handleClearClick}
                className="px-12 py-4 text-lg font-semibold w-full sm:w-auto border border-slate-300 hover:border-slate-400 text-slate-600 hover:bg-slate-50 transition-all rounded-full order-2 sm:order-1 outline-none focus:ring-2 focus:ring-[#1f3b82] focus:ring-offset-2"
              >
                Clear Form
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Confirmation Dialog Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
              aria-describedby="dialog-desc"
            >
              <h3 id="dialog-title" className="text-xl font-semibold text-slate-900">
                Clear all responses?
              </h3>
              <p id="dialog-desc" className="text-slate-600 leading-relaxed text-[15px]">
                This will remove all the answers you&apos;ve entered in this form. This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  ref={cancelBtnRef}
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all text-center focus:ring-2 focus:ring-[#1f3b82] outline-none"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmClear}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-all text-center focus:ring-2 focus:ring-red-500 outline-none"
                >
                  Clear Form
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-6 left-1/2 z-[110] bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 pointer-events-none"
          >
            <span>✨</span>
            <span>All responses have been cleared successfully.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
