"use server";

import { z } from "zod";

// 1. Define the exact shape and rules for incoming data
const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function sendEmailAction(formData: unknown) {
  // 2. Validate the incoming data against the Zod schema
  const validationResult = ContactFormSchema.safeParse(formData);

  if (!validationResult.success) {
    // Return the first Zod error message securely
    const error = validationResult.error.errors[0];
    return { success: false, message: error.message };
  }

  const validatedData = validationResult.data;

  // 3. Process the fully validated, strictly typed data
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const contactEmail = process.env.CONTACT_EMAIL || "suneelkarkee98@gmail.com";

  if (!serviceId || !templateId || !publicKey) {
    return { success: false, message: "Server misconfiguration. Please try again later." };
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: validatedData.name,
          to_name: "Sunil Karki",
          from_email: validatedData.email,
          to_email: contactEmail,
          message: `Service: ${validatedData.service || 'N/A'}\nBudget: ${validatedData.budget || 'N/A'}\n\n${validatedData.message}`,
        },
      }),
    });

    if (response.ok) {
      return { success: true, message: "Thanks! I'll get back to you within 24 hours." };
    } else {
      const errorText = await response.text();
      console.error("EmailJS API Error:", errorText);
      return { success: false, message: "Your message could not be sent. Please try again." };
    }
  } catch (error) {
    console.error("Server Action Failed:", error);
    return { success: false, message: "A server error occurred. Please try again." };
  }
}
