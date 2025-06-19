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
  const { data: tickets, isLoading, autoResponse } = useTickets();

  if (isLoading) return <div>Cargando tickets...</div>;
  if (!tickets?.length) return <div>No hay tickets</div>;

  const handleAutoResponse = (ticketId: string, message: string) => {
    autoResponse.mutate({ ticketId, message });
  };

  return (
    <div className="space-y-2">
      {tickets.map((ticket) => (
        // Contenedor (card)
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
            {/* Muestra el botón cuando el estado en base  de datos del registro esta en un estado pendiente de lo contrario no lo muestra */}
            {ticket.status == "pending" && (
              <Button
                onClick={() => handleAutoResponse(ticket.id, ticket.message)}
                variant="outline"
                className={cn(
                  "cursor-pointer hover:bg-[#D81159] hover:text-white shadow-lg mt-4"
                )}
              >
                Simular Respuesta Automática
              </Button>
            )}
            {/* Muestra la respuesta si esta en la base de datos de lo contrrio no lo muestra */}
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
