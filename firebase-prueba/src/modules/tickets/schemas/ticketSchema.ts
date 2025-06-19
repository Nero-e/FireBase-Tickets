import { z } from "zod";

// schema en zod (Validación de campos)
export const ticketSchema = z.object({
  subject: z.string().min(1, "Asunto requerido"),
  message: z.string().min(1, "mensaje requerido"),
  status: z.enum(["pending", "answered"]).default("pending"),
  response: z.string().optional(),
  createdAt: z.date().optional(),
  updateAt: z.date().optional(),
});

export const ticketFormSchema = ticketSchema.pick({
  subject: true,
  message: true,
})

export type Ticket = z.infer<typeof ticketSchema> & { id: string };
