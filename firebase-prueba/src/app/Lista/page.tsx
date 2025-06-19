import { TicketList } from "@/modules/tickets/components/TicketList";

export default function Home() {
  return (
    <main className="w-xl mx-auto py-20 space-y-4">
      <TicketList />
    </main>
  );
}