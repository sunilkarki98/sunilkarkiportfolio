"use client";

import { useState, useRef } from "react";
import { sendEmailAction } from "@/app/actions/sendEmail";

interface StatusState {
  type: "success" | "error" | "";
  message: string;
}

export function useContactForm<T extends Record<string, string>>(initialState: T) {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<T>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>({ type: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      const result = await sendEmailAction(form);

      if (result.success) {
        setForm(initialState);
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

  const updateField = (name: keyof T, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return { formRef, form, loading, status, handleChange, handleSubmit, updateField };
}
