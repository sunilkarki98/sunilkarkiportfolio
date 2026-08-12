"use client";

import { motion } from "framer-motion";
import { styles } from "@/styles";
import { fadeIn, textVariant } from "@/utils/motion";
import { useContactForm } from "@/hooks/useContactForm";
import FormField from "@/components/ui/FormField";
import SectionHeader from "@/components/ui/SectionHeader";

const servicesTiers = [
  {
    title: "Hourly Consulting",
    price: "From $50/hr",
    description: "Perfect for architecture reviews, debugging complex issues, or strategic tech advice.",
    features: [
      "System Architecture Review",
      "Performance Profiling",
      "Codebase Auditing",
      "1-on-1 Pair Programming",
    ],
    cta: "Book a Session",
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
    popular: true,
  },
  {
    title: "AI Automation",
    price: "From $75/hr",
    description: "Automate your workflows or integrate intelligent chatbots into your business.",
    features: [
      "n8n Low-Code Workflows",
      "Custom ChatGPT/LLM Integration",
      "Customer Support Chatbots",
      "Data Processing Pipelines",
    ],
    cta: "Automate Now",
  }
];

const serviceOptions = [
  { value: "", label: "Select a service", disabled: true },
  { value: "Hourly Consulting", label: "Hourly Consulting" },
  { value: "End-to-End Build", label: "End-to-End Build" },
  { value: "AI Automation", label: "AI Automation" },
];

const budgetOptions = [
  { value: "", label: "Select budget", disabled: true },
  { value: "Under $500", label: "Under $500" },
  { value: "$500 - $2,000", label: "$500 – $2,000" },
  { value: "$2,000 - $5,000", label: "$2,000 – $5,000" },
  { value: "$5,000+", label: "$5,000+" },
];

const initialFormState = {
  name: "",
  email: "",
  service: "",
  budget: "",
  message: "",
};

export default function ServicesClient() {
  const { formRef, form, loading, status, handleChange, handleSubmit, updateField } =
    useContactForm(initialFormState);

  const scrollToForm = (serviceName: string) => {
    updateField("service", serviceName);
    document.getElementById("services-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-bg min-h-screen pt-32 pb-16 relative z-0">
      <div className={`${styles.paddingX} max-w-7xl mx-auto`}>
        <motion.div variants={textVariant()} initial="hidden" animate="show">
          <p className={`${styles.sectionSubText}`}>Work with me</p>
          <h1 className={`${styles.sectionHeadText}`}>Services.</h1>
          <p className="mt-4 text-text-secondary text-[17px] max-w-3xl leading-[30px]">
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
              className={`relative bg-surface rounded-2xl p-8 border border-border-hover flex flex-col h-full group overflow-hidden`}
            >
              {/* Glow Effect */}
              <div className={`absolute -top-24 -left-24 w-64 h-64 bg-accent-glow rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500`} />
              
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-accent text-text-primary text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                  Most Popular
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-text-primary text-[24px] font-bold">{tier.title}</h3>
                <p className="text-text-accent font-black text-[32px] mt-2 mb-4">{tier.price}</p>
                <p className="text-text-secondary text-[14px] mb-8">{tier.description}</p>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-secondary text-[14px]">
                      <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToForm(tier.title)}
                  className={`w-full py-3 rounded-xl transition-all btn-primary`}
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
            <SectionHeader subtitle="Ready to start?" title="Get a Quote." center />
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-surface rounded-2xl p-8 border border-border flex flex-col gap-6 relative z-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="John Doe"
              />
              <FormField
                label="Your Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="john@company.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                label="Service"
                name="service"
                type="select"
                value={form.service}
                onChange={handleChange}
                required
                options={serviceOptions}
              />
              <FormField
                label="Budget Range"
                name="budget"
                type="select"
                value={form.budget}
                onChange={handleChange}
                options={budgetOptions}
              />
            </div>

            <FormField
              label="Project Details"
              name="message"
              type="textarea"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Tell me about your project, timeline, and goals..."
              rows={5}
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary py-4 px-8 rounded-xl disabled:opacity-50"
            >
              {loading ? "Sending..." : "Get My Free Quote in 24hrs"}
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
