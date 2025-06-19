import { TicketForm } from "@/modules/tickets/components/TicketForm";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-xl mx-auto py-20 space-y-4">
      <TicketForm />
      <Link href="./Lista">Lista de Tickets</Link>
    </main>
  );
}