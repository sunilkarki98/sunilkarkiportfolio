"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { styles } from "@/styles";
import { SectionWrapper } from "@/hoc";
import { slideIn } from "@/utils/motion";
import { useContactForm } from "@/hooks/useContactForm";
import FormField from "@/components/ui/FormField";
import PhoneField from "@/components/ui/PhoneField";
import SectionHeader from "@/components/ui/SectionHeader";

import { socialLinks } from "@/constants/social";
import SocialIcon from "@/components/ui/SocialIcon";
import StatusPulse from "@/components/ui/StatusPulse";
import { FaWhatsapp } from "react-icons/fa";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  countryCode: "+1",
  message: "",
  honeypot: "",
};

const Contact: React.FC = () => {
  const { formRef, form, loading, status, handleChange, handleSubmit, updateField } =
    useContactForm(initialFormState);

  return (
    <div className={`relative xl:mt-12 flex justify-center overflow-hidden`}>
      <motion.div
        variants={slideIn("up", "tween", 0.2, 1)}
        className='w-full max-w-6xl bg-surface border border-border shadow-md rounded-2xl relative z-[20] overflow-hidden'
      >
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column: Personal Touch */}
          <div className="lg:w-2/5 p-8 sm:p-12 bg-surface-alt flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border">
            <div>
              <p className={`${styles.sectionSubText} text-gradient`}>Get in touch</p>
              <h2 className={`${styles.sectionHeadText} text-text-primary mb-6`}>Let's Talk.</h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                I'm currently available for freelance work and new opportunities. 
                Whether you have a question, a project in mind, or just want to say hi, 
                I'll try my best to get back to you within 24 hours.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border shadow-sm mb-10">
                <StatusPulse label="Available for new projects" />
              </div>

              <div className="mb-12">
                <p className="text-text-primary font-medium mb-4">Prefer a quick chat?</p>
                <a 
                  href="https://wa.me/9779767663483" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm"
                >
                  <FaWhatsapp className="text-2xl" />
                  Message on WhatsApp
                </a>
              </div>
            </div>

            <div>
              <p className="text-text-primary font-medium mb-4">Connect with me</p>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <SocialIcon key={link.label} {...link} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:w-3/5 p-8 sm:p-12">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className='flex flex-col gap-6'
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <FormField
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="John Doe"
                  className="flex-1"
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
                  className="flex-1"
                />
              </div>

              <PhoneField
                label=""
                phoneName="phone"
                countryName="countryCode"
                phoneValue={form.phone}
                countryValue={form.countryCode}
                updateField={updateField}
              />

              <FormField
                label="Your Message"
                name="message"
                type="textarea"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project, goals, and timeline..."
                rows={6}
                minLength={10}
              />

              {/* Honeypot field - hidden from real users */}
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex items-center justify-between mt-4">
                <button
                  type='submit'
                  disabled={loading}
                  aria-disabled={loading}
                  className='btn-primary text-base py-3 px-8 rounded-xl w-full sm:w-auto min-w-[200px]'
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
                <p
                  aria-live='polite'
                  className={`text-sm ${status.type === "error" ? "text-red-400" : "text-green-400"}`}
                >
                  {status.message}
                </p>
              </div>
            </form>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
