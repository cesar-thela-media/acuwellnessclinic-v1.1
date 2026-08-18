import { z } from "zod";

export const contactPayloadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  subject: z.enum([
    "General",
    "Appointment Request",
    "Testimonial Submission",
    "Question",
    "Comment",
  ]),
  message: z.string().min(1),
});

export const newsletterPayloadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional().default(""),
  email: z.string().email(),
});

export const schedulePayloadSchema = z.record(z.string(), z.unknown());

export const submitBodySchema = z.object({
  type: z.enum(["contact", "newsletter", "schedule"]),
  payload: z.unknown(),
});

export type SubmitType = z.infer<typeof submitBodySchema>["type"];
