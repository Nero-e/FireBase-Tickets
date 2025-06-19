import { create } from "zustand"
import { Ticket } from "../schemas/ticketSchema";

// configuracion state ticket con zustand
interface TicketsState {
    tickets: Ticket[];
    setTickets: (tickets:Ticket[]) => void;
    addTicket: (ticket: Ticket) => void;
}

export const useTicketsSotre = create<TicketsState>((set) => ({
    tickets: [],
    setTickets: (tickets) => set ({ tickets}),
    addTicket: (ticket) => set((state) => ({ tickets: [ticket, ...state.tickets]})),
}));