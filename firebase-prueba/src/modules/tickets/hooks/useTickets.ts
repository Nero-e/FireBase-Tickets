import { useMutation, useQuery, useQueryClient  } from "@tanstack/react-query";
import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc } from "firebase/firestore";

import { db } from "@/shared/lib/firebase";
import { Ticket } from "../schemas/ticketSchema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toDateOrNull(val: any): Date | undefined {
    if (val?.toDate) return val.toDate();
    if (val instanceof Date) return val;
    return undefined;
}

export function useTickets() {

    const queryClient = useQueryClient();

    const addTicket = useMutation({
        mutationFn: async (data: { subject: string; message: string;}) => {
            const ticketRef = await addDoc(collection(db, "tickets"), {
                ...data,
                status: "pending",
                createdAt: serverTimestamp(),
            });
            return ticketRef;
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["tickets"]}),
    })

    const addResponse = useMutation({
        mutationFn: async (ticketId: string) => {
            const ticketResponseRef = doc(db, "tickets", ticketId);
            await updateDoc(ticketResponseRef, {
                status: "answered",
                response: "!Gracias por tu ticket¡ Aquí va una respuesta automática.",
                updateAt: serverTimestamp(),
            });
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["tickets"]}),
    })

    const { data, isLoading } = useQuery({
        queryKey: ["tickets"],
        queryFn: async (): Promise<Ticket[]> => {
            const querySnapshot = await getDocs(collection(db, "tickets"));
            return querySnapshot.docs.map((doc) => {
                const data = doc.data() as Omit<Ticket,"id">;
                return {
                    ...data,
                    id: doc.id,
                    createdAt: toDateOrNull(data.createdAt),
                };
            });
        },
    });

    return { addTicket, data, isLoading, addResponse };
}