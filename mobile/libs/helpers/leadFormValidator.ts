import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const leadFormSchema = z.object({
  offerId: z.string().nonempty("Please select an offer"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export type LeadFormSchema = z.infer<typeof leadFormSchema>;

export const leadFormValidator = zodResolver(leadFormSchema);
