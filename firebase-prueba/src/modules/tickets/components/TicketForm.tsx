"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ticketFormSchema } from "../schemas/ticketSchema";
import { useTickets } from "../hooks/useTickets";
import { cn } from "@/shared/lib/ui/utils";

type FormValues = z.infer<typeof ticketFormSchema>;

export const TicketForm = () => {
  const { addTicket } = useTickets();
  const form = useForm<FormValues>({
    resolver: zodResolver(
      ticketFormSchema.pick({
        subject: true,
        message: true,
      })
    ),
  });

  const onSubmit = async (values: FormValues) => {
    await addTicket.mutateAsync(values);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn ("text-2xl")}>Envio de Tickets</CardTitle>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-rows-2 gap-3"
          >
            <Label>Asunto</Label>
            <Input placeholder="Asunto" {...form.register("subject")} />
            <Label>Mensaje</Label>
            <Textarea placeholder="Mensaje" {...form.register("message")} />
            <Button
              className={cn("cursor-pointer hover:bg-[#D81159]")}
              type="submit"
              disabled={addTicket.isPending}
            >
              Enviar Ticket
            </Button>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
