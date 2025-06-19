"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useTickets } from "../hooks/useTickets";
import { cn } from "@/shared/lib/ui/utils";
import { Button } from "@/shared/components/ui/button";

export const TicketList = () => {
  const { data: tickets, isLoading } = useTickets();

  if (isLoading) return <div>Cargando tickets...</div>;
  if (!tickets?.length) return <div>No hay tickets</div>;

  return (
    <div className="space-y-2">
      {tickets.map((ticket) => (
        <Card key={ticket.id}>
          <CardHeader>
            <CardTitle>Ticket #:</CardTitle>
            <CardDescription>{ticket.id}</CardDescription>
          </CardHeader>
          <CardContent className={cn("space-y-1.5")}>
            <div>
              <strong>Asunto:</strong> {ticket.subject}
            </div>
            <div>
              <strong>Mensaje:</strong> {ticket.message}
            </div>
            <div>
              <strong>Estado:</strong> {ticket.status}
            </div>
            {ticket.status == "pending" && (
              <Button
                variant="outline"
                className={cn(
                  "cursor-pointer hover:bg-[#D81159] hover:text-white shadow-lg mt-4"
                )}
              >
                Simular Respuesta Automática
              </Button>
            )}
            {ticket.status == "answered" && (
              <div>
                <strong>Estado:</strong> {ticket.response}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
