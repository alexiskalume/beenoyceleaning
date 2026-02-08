"use server";

import { z } from "zod";

// This schema is a server-side safeguard.
// The primary, translated validation happens on the client.
export const contactFormSchemaServer = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  service: z.string().min(1, { message: "Please select a service." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchemaServer>;

export async function submitContactForm(data: ContactFormValues) {
  const result = contactFormSchemaServer.safeParse(data);

  if (!result.success) {
    // In a real app, you might want to log this attempt.
    return {
      success: false,
      message: "Invalid form data. Please check your entries.",
    };
  }

  // In a real application, you would now:
  // 1. Send an email notification (e.g., using Resend, Nodemailer).
  // 2. Save the inquiry to your database.
  console.log("New contact form submission received on server:", result.data);

  // For this demo, we'll just simulate a successful submission.
  return { success: true, message: "Your request has been sent successfully!" };
}
