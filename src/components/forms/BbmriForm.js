"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BbmriForm() {
  const [formData, setFormData] = useState({
    q1: "",
    q2: "", q2Other: "",
    q3: "",
    q4: "",
    q5: "",
    q6: [],
    q7: "",
    q8: "",
    q9: "",
    q10: [],
    q11: "", q11Other: "",
    q12: "",
    q13: "",
    q14: "",
    q15: "",
    q16: "",
    q17: [],
    q18: "",
    q19: "",
    q20: [], q20Other: "",
    childName: "",
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
      const saved = localStorage.getItem("bbmri_form_data");
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
      localStorage.setItem("bbmri_form_data", JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  // Calculate progress based on filled sections/fields
  useEffect(() => {
    const fieldsToTrack = [
      formData.q1, formData.q2, formData.q3, formData.q4, formData.q5,
      formData.q6.length > 0 ? "y" : "", formData.q7, formData.q8, formData.q9,
      formData.q10.length > 0 ? "y" : "", formData.q11, formData.q12, formData.q13,
      formData.q14, formData.q15, formData.q16, formData.q17.length > 0 ? "y" : "",
      formData.q18, formData.q19, formData.q20.length > 0 ? "y" : "",
      formData.childName, formData.parentName, formData.phone, formData.email,
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

    if (!formData.q1.trim()) newErrors.q1 = reqText;
    if (!formData.q2) newErrors.q2 = reqText;
    if (formData.q2 === "Other" && !formData.q2Other.trim()) newErrors.q2Other = reqText;
    
    if (!formData.q7) newErrors.q7 = reqText;
    if (!formData.q8) newErrors.q8 = reqText;
    
    if (formData.q10.length === 0) newErrors.q10 = reqText;
    if (formData.q11 === "Other" && !formData.q11Other.trim()) newErrors.q11Other = reqText;
    
    if (!formData.q14) newErrors.q14 = reqText;
    if (formData.q17.length === 0) newErrors.q17 = reqText;
    
    if (formData.q20.includes("Other") && !formData.q20Other.trim()) newErrors.q20Other = reqText;
    
    if (!formData.childName.trim()) newErrors.childName = reqText;
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
Food Foundations Reflection
Submission Date: ${new Date().toLocaleString()}

--- Parent Details ---
Parent Name: ${formData.parentName}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}
How they heard: ${formData.source === "Other" ? formData.sourceOther : formData.source}

--- Child Details ---
Child Name: ${formData.childName}
Age: ${formData.q1}

--- Section 2: Let's Begin With Mealtimes ---
Q2 (First feeling): ${formData.q2 === "Other" ? formData.q2Other : formData.q2}

--- Section 3: Eating Patterns & Appetite ---
Q3 (Eating across day): ${formData.q3 || "Not answered"}
Q4 (Appetite description): ${formData.q4 || "Not answered"}

--- Section 4: Understanding Food Refusals ---
Q5 (When child refuses): ${formData.q5 || "Not answered"}
Q6 (Happening right now): ${formData.q6.length > 0 ? formData.q6.join(", ") : "None selected"}

--- Section 5: Your Child's Food Personality ---
Q7 (New food appearance): ${formData.q7}
Q8 (Approach to food): ${formData.q8}
Q9 (Statement sounds most like child): ${formData.q9 || "Not answered"}

--- Section 6: Mealtime Environment ---
Q10 (Mealtimes in home): ${formData.q10.join(", ")}
Q11 (Who usually feeds): ${formData.q11 === "Other" ? formData.q11Other : formData.q11 || "Not answered"}
Q12 (Screens used): ${formData.q12 || "Not answered"}
Q13 (Meal duration): ${formData.q13 || "Not answered"}

--- Section 7: Appetite Regulation & Feeding Dynamics ---
Q14 (Who decides how much): ${formData.q14}
Q15 (Trust child to stop): ${formData.q15 || "Not answered"}
Q16 (Treats as encouragement): ${formData.q16 || "Not answered"}

--- Section 8: Independence at Mealtimes ---
Q17 (Child can do): ${formData.q17.join(", ")}
Q18 (Reason for stepping in): ${formData.q18 || "Not answered"}
Q19 (Participation in prep): ${formData.q19 || "Not answered"}

--- Section 9: Reflection & Insights ---
Q20 (Worries most): ${formData.q20.map(v => v === "Other" ? formData.q20Other : v).join(", ") || "None selected"}

--- Section 11: Research Consent ---
Consent choice: ${formData.consent}
    `.trim();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "d51706c9-c8f1-4081-956d-254aa31caf8e");
      formDataToSend.append("subject", `New Reflection Submission from ${formData.parentName}`);
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
        localStorage.removeItem("bbmri_form_data"); // clear draft on success
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
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="bb-section-title mb-6">Thank you for completing the Food Foundations Reflection.</h2>
          <div className="text-justify space-y-4 text-slate-700 leading-relaxed text-[15px]">
            <p>If a few of the questions made you pause and think, &quot;I hadn&apos;t looked at it that way before,&quot; that&apos;s exactly why we created this reflection.</p>
            <p>We&apos;re now preparing your personalised report based on your responses. Within the next 24–48 hours, you&apos;ll receive insights into your child&apos;s eating habits, emerging strengths, and gentle ideas you can try at home.</p>
            <p>Remember, this isn&apos;t about being a perfect parent. It&apos;s about understanding your child a little more deeply than you did yesterday.</p>
            <p>Keep an eye on your WhatsApp - your reflection is on its way.</p>
            <p className="pt-4 font-medium italic">With warmth,<br/>- Blue Blocks Micro Research Institute (BBMRI)</p>
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

  const renderCheckboxGroup = (name, options, withOther = false) => {
    return (
      <div className="space-y-3 mt-4" id={`field-${name}`}>
        {options.map((opt) => (
          <label key={opt} className={`flex items-start p-4 rounded-xl border cursor-pointer transition-all ${formData[name].includes(opt) ? 'border-[#1f3b82] bg-[#1f3b82]/5' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
            <div className="flex items-center h-6">
              <input
                type="checkbox"
                name={name}
                value={opt}
                checked={formData[name].includes(opt)}
                onChange={handleChange}
                className="w-5 h-5 text-[#1f3b82] rounded border-slate-300 focus:ring-[#1f3b82]"
              />
            </div>
            <div className="ml-3 text-slate-700 text-[15px]">{opt}</div>
          </label>
        ))}
        {withOther && (
          <div className="mt-2 pl-12 pr-4">
            <AnimatePresence>
              {formData[name].includes("Other") && (
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
          <h1 className="bb-hero-title">Food Foundations Reflection</h1>
          <p className="bb-hero-subtitle !text-white/90">Most parents complete this reflection in under 3 minutes.</p>
          
          <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm mt-8 text-justify space-y-4 text-white/90 leading-relaxed">
            <p>If mealtimes sometimes feel stressful - the picky eating, food refusals, or wondering whether your child has eaten enough - you&apos;re not alone.</p>
            <p>These questions are designed to help you see your child&apos;s eating habits through a different lens. Many parents tell us the questions themselves were eye-opening.</p>
            <p>Complete the reflection today and receive your FREE personalised report within 24 hours, including insights into your child&apos;s eating habits, strengths, and practical ideas to try at home.</p>
            <p className="font-medium text-white">There are no right or wrong answers - simply answer honestly based on your everyday experience.</p>
          </div>
          <p className="text-white/70 text-sm pt-4 uppercase tracking-wider font-semibold">Blue Blocks Micro Research Institute (BBMRI)</p>
        </div>
      </section>

      {/* Form Area */}
      <section className="bb-section -mt-8 px-4 pb-32">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-12" noValidate>
          
          {/* Section 2 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 2</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Let&apos;s Begin With Mealtimes</h2>
            <p className="text-slate-600 mb-8 text-justify">There are no right or wrong answers. Simply choose the response that feels closest to your family&apos;s everyday experience.</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q1. How old is your child? <span className="text-red-500">*</span></h3>
                {renderInput("q1", "", "text", "off", "How old is your child?")}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q2. When you picture your child at a meal, what&apos;s the first feeling that comes up? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q2", ["Joy", "Concern", "Frustration", "Exhaustion", "It depends on the day", "Other"], true)}
              </div>
            </div>
          </motion.div>

          {/* Section 3 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 3</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-8">Eating Patterns & Appetite</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q3. Roughly how does your child eat across a day?</h3>
                {renderRadioGroup("q3", ["3 proper meals", "3 meals + snacks", "1–2 meals, picks at the rest", "Nibbles all day"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q4. Which best describes your child&apos;s appetite?</h3>
                {renderRadioGroup("q4", ["Consistently good", "Good on some days, low on others", "Usually low", "Depends heavily on snacks and drinks", "I'm worried they don't eat enough"])}
              </div>
            </div>
          </motion.div>

          {/* Section 4 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 4</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-8">Understanding Food Refusals</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q5. When your child refuses food, what feels most true?</h3>
                {renderRadioGroup("q5", ["They genuinely don't want the food", "They want more control over the situation", "They are tired, distracted, or overwhelmed", "It changes from day to day", "I'm not sure"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q6. Which of these are happening right now?</h3>
                {renderCheckboxGroup("q6", ["Refuses foods they once loved", "Eats almost nothing some days, then loads up the next", "Lives on beige/sweet foods", "Rejects anything new on sight", "Leaves the table frequently"])}
              </div>
            </div>
          </motion.div>

          {/* Section 5 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 5</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-8">Your Child&apos;s Food Personality</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q7. When a new food appears, where is your child on this journey? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q7", ["Won't let it on the plate", "Lets it sit there", "Touches or smells it", "Tastes it", "Eats it"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q8. How would you describe your child&apos;s approach to food? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q8", ["Cautious", "Strong-willed", "Enthusiastic", "Easygoing", "Unpredictable"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q9. Which statement sounds most like your child?</h3>
                {renderRadioGroup("q9", ["\"I want to do it myself.\"", "\"I need time before I try something new.\"", "\"I love exploring and experimenting.\"", "\"I prefer familiar routines.\"", "\"It depends on the day.\""])}
              </div>
            </div>
          </motion.div>

          {/* Section 6 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 6</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-8">Mealtime Environment</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q10. Which of these are part of mealtimes in your home? <span className="text-red-500">*</span></h3>
                {renderCheckboxGroup("q10", ["My child sits and eats at the table", "Parent reminds child to eat", "I chase my child around to feed them", "Toys or distractions are used to encourage eating", "It depends on the day"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q11. Who usually feeds your child during most meals?</h3>
                {renderRadioGroup("q11", ["Mother", "Father", "Grandparent", "My child mostly feeds themselves", "Other"], true)}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q12. How often are screens used during meals?</h3>
                {renderRadioGroup("q12", ["Never", "Rarely", "Sometimes", "Often", "Almost every meal"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q13. How long does a typical meal last?</h3>
                {renderRadioGroup("q13", ["Less than 10 minutes", "10–20 minutes", "20–30 minutes", "30–45 minutes", "More than 45 minutes"])}
              </div>
            </div>
          </motion.div>

          {/* Section 7 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 7</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-8">Appetite Regulation & Feeding Dynamics</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q14. At your table, who decides how much your child eats? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("q14", ["I mostly decide", "We both influence it", "My child mostly decides", "I've never thought about it this way"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q15. How often do you trust your child to stop eating when they feel full?</h3>
                {renderRadioGroup("q15", ["Rarely", "Sometimes", "Often", "Almost always"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q16. How often do treats become part of encouraging your child to eat?</h3>
                {renderRadioGroup("q16", ["Often", "Sometimes", "Rarely because we don't keep treats at home", "Never"])}
              </div>
            </div>
          </motion.div>

          {/* Section 8 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 8</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-8">Independence at Mealtimes</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q17. Which of these can your child already do? <span className="text-red-500">*</span></h3>
                {renderCheckboxGroup("q17", ["Use a spoon/fork", "Drink from an open cup", "Serve themselves food", "Pour water", "Carry or clear a plate", "None yet"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q18. When you step in to feed your child, what is usually the reason?</h3>
                {renderRadioGroup("q18", ["Needs help", "Needs encouragement", "It's quicker", "It avoids mess", "A combination of these", "They already self-feed"])}
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q19. How often does your child participate in food preparation?</h3>
                {renderRadioGroup("q19", ["Daily", "Several times per week", "Occasionally", "Rarely", "Never"])}
              </div>
            </div>
          </motion.div>

          {/* Section 9 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 9</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-8">Reflection & Insights</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-lg text-slate-800">Q20. What worries you most about your child&apos;s eating right now?</h3>
                {renderCheckboxGroup("q20", ["Not eating enough", "Picky eating", "Nutrition", "Weight gain", "Mealtime stress", "Screen dependence", "Lack of independence", "Nothing in particular", "Other"], true)}
              </div>
            </div>
          </motion.div>

          {/* Section 10 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 10</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-8">Receive Your Personalised Reflection</h2>
            
            <div className="space-y-4">
              {renderInput("childName", "Child's Name *", "text", "off")}
              {renderInput("parentName", "Parent Name *", "text", "name")}
              {renderInput("phone", "Phone Number (WhatsApp) *", "tel", "tel")}
              {renderInput("email", "Email Address *", "email", "email")}
              {renderInput("address", "Home Address (Area, Pincode) *", "text", "street-address")}
              
              <div className="mt-8 pt-4 border-t border-slate-100">
                <h3 className="font-medium text-lg text-slate-800">How did you hear about us? <span className="text-red-500">*</span></h3>
                {renderRadioGroup("source", ["Instagram", "Facebook", "Google", "Friend", "School parent", "Workshop", "LinkedIn", "Other"], true)}
              </div>
            </div>
          </motion.div>

          {/* Section 11 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bb-card bg-white shadow-xl shadow-slate-200/50">
            <div className="bb-eyebrow mb-2">Section 11</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Research Consent</h2>
            <p className="text-slate-600 mb-8 text-justify">We never share anything that could identify you or your child. You&apos;ll receive your full personalised reflection whatever you choose.</p>
            
            <div>
              <h3 className="font-medium text-lg text-slate-800">Choose how you&apos;d like to receive your personalised AI report <span className="text-red-500">*</span></h3>
              {renderRadioGroup("consent", [
                "Option 1 (Free): Receive my personalised AI report FREE - I consent to my responses being used anonymously by BBMRI for research, publications, and improving future parent reports. My identity and my child's identity will never be disclosed.",
                "Option 2 (Private Report – ₹1,000): Receive my personalised AI report as a private report - my responses will be used only to generate my report and will not be included in BBMRI's research database or publications."
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
            <p className="text-slate-500 text-sm mt-4">By submitting, you agree to our privacy policy and terms.</p>
          </div>
        </form>
      </section>
    </>
  );
}
