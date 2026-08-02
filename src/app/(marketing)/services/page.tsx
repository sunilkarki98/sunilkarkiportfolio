"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { styles } from "@/styles";
import { fadeIn, textVariant } from "@/utils/motion";
import { sendEmailAction } from "@/app/actions/sendEmail";

const servicesTiers = [
  {
    title: "Hourly Consulting",
    price: "$15/hr",
    description: "Perfect for architecture reviews, debugging complex issues, or strategic tech advice.",
    features: [
      "System Architecture Review",
      "Performance Profiling",
      "Codebase Auditing",
      "1-on-1 Pair Programming",
    ],
    cta: "Book a Session",
    glowColor: "from-blue-500/20 to-transparent",
    borderColor: "border-blue-500/30",
    buttonColor: "bg-blue-600 hover:bg-blue-500",
  },
  {
    title: "End-to-End Build",
    price: "Custom Quote",
    description: "Complete design, architecture, and development of your SaaS or web application.",
    features: [
      "Full Stack Development (Next.js/Node)",
      "Database & Infrastructure Setup",
      "UI/UX Design & Implementation",
      "Post-Launch Support (30 days)",
    ],
    cta: "Start a Project",
    glowColor: "from-purple-500/20 to-transparent",
    borderColor: "border-purple-500/30",
    buttonColor: "bg-purple-600 hover:bg-purple-500",
    popular: true,
  },
  {
    title: "AI Automation",
    price: "$20/hr",
    description: "Automate your workflows or integrate intelligent chatbots into your business.",
    features: [
      "n8n Low-Code Workflows",
      "Custom ChatGPT/LLM Integration",
      "Customer Support Chatbots",
      "Data Processing Pipelines",
    ],
    cta: "Automate Now",
    glowColor: "from-green-500/20 to-transparent",
    borderColor: "border-green-500/30",
    buttonColor: "bg-green-600 hover:bg-green-500",
  }
];

interface ServiceFormState {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

interface StatusState {
  type: "success" | "error" | "";
  message: string;
}

export default function ServicesPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<ServiceFormState>({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>({ type: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const scrollToForm = (serviceName: string) => {
    setForm((prev) => ({ ...prev, service: serviceName }));
    document.getElementById("services-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      const result = await sendEmailAction(form);
      
      if (result.success) {
        setForm({ name: "", email: "", service: "", budget: "", message: "" });
        setStatus({ type: "success", message: result.message });
      } else {
        setStatus({ type: "error", message: result.message });
      }
    } catch (error) {
      console.error("Submission failed", error);
      setStatus({ type: "error", message: "Your message could not be sent. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary min-h-screen pt-32 pb-16 relative z-0">
      <div className={`${styles.paddingX} max-w-7xl mx-auto`}>
        <motion.div variants={textVariant()} initial="hidden" animate="show">
          <p className={`${styles.sectionSubText}`}>Work with me</p>
          <h1 className={`${styles.sectionHeadText}`}>Services.</h1>
          <p className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
            Whether you need strategic consulting, a full-scale web application, or AI-powered automation, 
            I bring years of engineering experience to deliver high-quality, scalable solutions.
          </p>
        </motion.div>

        {/* Service Tier Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesTiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              variants={fadeIn("up", "spring", index * 0.5, 0.75)}
              initial="hidden"
              animate="show"
              className={`relative bg-tertiary rounded-2xl p-8 border ${tier.borderColor} flex flex-col h-full group overflow-hidden`}
            >
              {/* Glow Effect */}
              <div className={`absolute -top-24 -left-24 w-64 h-64 bg-gradient-to-br ${tier.glowColor} rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500`} />
              
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                  Most Popular
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-white text-[24px] font-bold">{tier.title}</h3>
                <p className="text-purple-400 font-black text-[32px] mt-2 mb-4">{tier.price}</p>
                <p className="text-secondary text-[14px] mb-8">{tier.description}</p>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white-100 text-[14px]">
                      <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToForm(tier.title)}
                  className={`w-full py-3 rounded-xl text-white font-bold transition-all hover:scale-105 active:scale-95 text-center ${tier.buttonColor}`}
                >
                  {tier.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inline Contact Form */}
        <motion.div
          id="services-form"
          variants={fadeIn("up", "spring", 0.5, 0.75)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-24 max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <p className={`${styles.sectionSubText}`}>Ready to start?</p>
            <h2 className={`${styles.sectionHeadText} text-gradient`}>Get a Quote.</h2>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-tertiary rounded-2xl p-8 border border-white/10 flex flex-col gap-6 relative z-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="flex flex-col">
                <span className="text-white font-medium mb-2">Your Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="John Doe"
                  className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 focus:border-purple-500 transition-colors font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-2">Your Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="john@company.com"
                  className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 focus:border-purple-500 transition-colors font-medium"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="flex flex-col">
                <span className="text-white font-medium mb-2">Service</span>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="bg-primary py-4 px-6 text-white rounded-lg outline-none border border-white/10 focus:border-purple-500 transition-colors font-medium appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a service</option>
                  <option value="Hourly Consulting">Hourly Consulting</option>
                  <option value="End-to-End Build">End-to-End Build</option>
                  <option value="AI Automation">AI Automation</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-2">Budget Range</span>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="bg-primary py-4 px-6 text-white rounded-lg outline-none border border-white/10 focus:border-purple-500 transition-colors font-medium appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select budget</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 - $2,000">$500 – $2,000</option>
                  <option value="$2,000 - $5,000">$2,000 – $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Project Details</span>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project, timeline, and goals..."
                className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 focus:border-purple-500 transition-colors font-medium resize-none"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 py-4 px-8 rounded-xl text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-500/30 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Inquiry"}
            </button>

            {status.message && (
              <p
                aria-live="polite"
                className={`text-center font-medium ${status.type === "error" ? "text-red-400" : "text-green-400"}`}
              >
                {status.message}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
