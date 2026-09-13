"use client";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

import { useContactForm } from "@/hooks/useContactForm";
import FormField from "@/components/ui/FormField";
import PhoneField from "@/components/ui/PhoneField";
import SectionHeader from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";

import { socialLinks } from "@/constants/social";
import SocialIcon from "@/components/ui/SocialIcon";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300); // Matches the CSS transition duration
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const { formRef, form, loading, status, handleChange, handleSubmit, updateField } =
    useContactForm(initialFormState);

  return (
    <>
      {/* ── CONTACT SECTION ── */}
      <Container as="section" id="contact" className="section-padding-x section-padding-y relative z-0">
        
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <SectionHeader subtitle="Contact" title="Get in touch." center={false} />
        </div>

        {/* CTA Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border border-border p-8 sm:p-12">
          <div className="max-w-xl">
            <h3 className="font-heading font-bold text-text-primary text-2xl sm:text-3xl uppercase tracking-tight mb-3">
              Ready to start a project?
            </h3>
            <p className="text-text-secondary text-sm sm:text-base font-light leading-relaxed">
              I'm currently available for freelance work and new opportunities.
              Let's build something amazing together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary px-8 py-3 rounded-none whitespace-nowrap text-center text-sm font-mono tracking-widest uppercase border border-transparent hover:bg-text-secondary"
            >
              Start a Project
            </button>
            <a
              href="https://wa.me/9779767663483"
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center items-center gap-2 bg-surface hover:bg-surface-alt text-text-primary font-mono text-sm tracking-widest uppercase px-8 py-3 rounded-none whitespace-nowrap transition-colors border border-border"
            >
              <FaWhatsapp className="text-lg" />
              WhatsApp
            </a>
          </div>
        </div>
      </Container>

      {/* ── MODAL OVERLAY ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">

          {/* Backdrop */}
          <div
            onClick={handleClose}
            className={`absolute inset-0 bg-bg/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isClosing ? "opacity-0" : "opacity-100"}`}
          />

          {/* Modal Content */}
          <div
            className={`w-full max-w-5xl bg-surface border border-border relative z-10 shadow-2xl flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out transform ${isClosing ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"}`}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors z-20"
            >
              <FiX className="w-5 h-5" />
            </button>

              {/* Left Column */}
              <div className="lg:w-2/5 p-8 sm:p-12 bg-surface-alt flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-surface border border-border cursor-default w-fit">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-text-secondary font-mono tracking-wider uppercase text-[10px]">
                      Available
                    </span>
                  </div>

                  <span className="font-mono text-xs tracking-[0.2em] text-text-muted uppercase mb-2 block">
                    {"{"} GET IN TOUCH {"}"}
                  </span>
                  <h2 className="font-heading font-bold text-text-primary text-3xl sm:text-4xl uppercase tracking-tight mb-6">
                    Let's Talk.
                  </h2>

                  <p className="text-text-secondary leading-relaxed mb-8 text-sm font-light">
                    Whether you have a question, a project in mind, or just want to say hi,
                    I'll try my best to get back to you within 24 hours.
                  </p>

                  <div className="mb-12">
                    <p className="text-text-primary font-mono text-xs tracking-widest uppercase mb-4">Prefer a quick chat?</p>
                    <a
                      href="https://wa.me/9779767663483"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 bg-text-primary hover:bg-text-secondary text-surface font-mono text-sm tracking-widest uppercase py-3 px-6 transition-colors"
                    >
                      <FaWhatsapp className="text-xl" />
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-text-primary font-mono text-xs tracking-widest uppercase mb-4">Connect</p>
                  <div className="flex gap-4">
                    {socialLinks.map((link) => (
                      <SocialIcon key={link.label} {...link} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: The Form */}
              <div className="lg:w-3/5 p-8 sm:p-12 bg-surface">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 h-full justify-center"
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
                    label="Phone Number"
                    phoneName="phone"
                    countryName="countryCode"
                    phoneValue={form.phone}
                    countryValue={form.countryCode}
                    updateField={(name, value) => updateField(name as any, value)}
                  />

                  <FormField
                    label="Your Message"
                    name="message"
                    type="textarea"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project, goals, and timeline..."
                    rows={5}
                    minLength={10}
                  />

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honeypot"
                    value={form.honeypot}
                    onChange={handleChange}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="flex items-center justify-between mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      aria-disabled={loading}
                      className="btn-primary text-sm font-mono tracking-widest uppercase py-3 px-8 w-full sm:w-auto min-w-[200px] border border-transparent hover:bg-text-secondary"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                    <p
                      aria-live="polite"
                      className={`text-sm ${status.type === "error" ? "text-red-400" : "text-green-400"}`}
                    >
                      {status.message}
                    </p>
                  </div>
                </form>
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
