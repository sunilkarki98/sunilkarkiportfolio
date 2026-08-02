"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { sendEmailAction } from "../app/actions/sendEmail";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const EarthCanvas = dynamic(() => import("./canvas/Earth"), {
  ssr: false,
});

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

interface StatusState {
  type: "success" | "error" | "";
  message: string;
}

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>({ type: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      const result = await sendEmailAction(form);
      
      if (result.success) {
        setForm({ name: "", email: "", message: "" });
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
    <div
      className={`relative xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black/20 backdrop-blur-sm xl:bg-black-100 p-8 rounded-2xl relative z-[20]'
      >
        <p className={`${styles.sectionSubText} text-gradient`}>Get in touch</p>
        <h4 className={`${styles.sectionHeadText} text-gradient`}>Contact.</h4>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white text-lg font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              autoComplete='name'
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              required
              autoComplete='email'
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              required
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            aria-disabled={loading}
            className='bg-gradient-to-r from-green-700  to-purple-900 text-lg py-2.5 px-8  rounded-xl outline outline-none w-fit text-green-400 font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
          <p
            aria-live='polite'
            className={status.type === "error" ? "text-red-300" : "text-green-300"}
          >
            {status.message}
          </p>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] flex items-center justify-center'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
