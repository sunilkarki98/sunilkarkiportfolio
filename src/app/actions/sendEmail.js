"use server";

export async function sendEmailAction(formData) {
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
          from_name: formData.name,
          to_name: "Sunil Karki",
          from_email: formData.email,
          to_email: contactEmail,
          message: `Service: ${formData.service}\nBudget: ${formData.budget}\n\n${formData.message}`,
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
