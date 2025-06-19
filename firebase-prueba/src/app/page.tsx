import { TicketForm } from "@/modules/tickets/components/TicketForm";
import { TicketList } from "@/modules/tickets/components/TicketList";
// import Link from "next/link";

export default function Home() {
  return (
    <main className="w-xl mx-auto py-20 space-y-4">
      <TicketForm />
      <TicketList />
      {/* <Link className="" href="./Lista">Lista de Tickets</Link> */}
    </main>
  );
}