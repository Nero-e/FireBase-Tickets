export async function fetchGroqApi(userMessage: string) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: userMessage }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.content) return data.content;

    throw new Error();
  } catch (e) {
    console.error(e);
    return "¡Gracias por tu ticket! Aquí va una respuesta automática.";
  }
}
