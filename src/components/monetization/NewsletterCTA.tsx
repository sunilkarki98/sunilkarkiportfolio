"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call to a mailing list service
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <motion.div 
      variants={fadeIn("up", "spring", 0.5, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="w-full bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-md relative overflow-hidden mt-16"
    >
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-gray-100 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col gap-8 items-center justify-center text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-black font-extrabold text-3xl mb-4">
            Join the inner circle
          </h3>
          <p className="text-gray-600 text-[16px] leading-relaxed">
            Get exclusive insights on software engineering, system design, and AI automation. <br/><span className="text-sm font-bold text-text-muted">(Note: This is currently a UI demo component)</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === "loading" || status === "success"}
            className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all min-w-[280px]"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={`px-8 py-4 rounded-xl font-bold transition-all shadow-md ${
              status === "success" 
                ? "bg-green-500 text-white"
                : "bg-black hover:bg-gray-800 text-white hover:scale-105 active:scale-95"
            }`}
          >
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
