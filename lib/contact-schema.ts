import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  business: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail — 10 characters minimum.")
    .max(4000),
  /** Honeypot: real people leave this empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;
