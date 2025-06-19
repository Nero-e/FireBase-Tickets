import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "@/shared/lib/firebase";
import { Ticket } from "../schemas/ticketSchema";
import { fetchGroqApi } from "./useGroq";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toDateOrNull(val: any): Date | undefined {
  if (val?.toDate) return val.toDate();
  if (val instanceof Date) return val;
  return undefined;
}

export function useTickets() {
  const queryClient = useQueryClient();

  // Mutacion para añadir un ticket
  const addTicket = useMutation({
    mutationFn: async (data: { subject: string; message: string }) => {
      const ticketRef = await addDoc(collection(db, "tickets"), {
        ...data,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      return ticketRef;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
  });

  // Respuesta automática con botón
  const addResponse = useMutation({
    mutationFn: async (ticketId: string) => {
      const ticketResponseRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketResponseRef, {
        status: "answered",
        response: "¡Gracias por tu ticket! Aquí va una respuesta automática.",
        updateAt: serverTimestamp(),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
  });
  
  // Respuesta automatica con Groq
  const autoResponse = useMutation({
    mutationFn: async ({ticketId, message}: {ticketId: string; message: string}) => {
        const botResponse = await fetchGroqApi(message)
        const ticketRef = doc(db, "tickets", ticketId);
        await updateDoc(ticketRef, {
            status: "answered",
            response: botResponse,
            updateAt: serverTimestamp(),
        });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
  });

 // Obtener datos del firebase
  const { data, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: async (): Promise<Ticket[]> => {
      const querySnapshot = await getDocs(query(collection(db, "tickets"), orderBy("createdAt")));
      return querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Ticket, "id">;
        return {
          ...data,
          id: doc.id,
          createdAt: toDateOrNull(data.createdAt),
        };
      });
    },
  });

  return { addTicket, data, isLoading, addResponse, autoResponse };
}
