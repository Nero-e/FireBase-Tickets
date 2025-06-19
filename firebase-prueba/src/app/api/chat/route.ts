import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error("No se encuentro la API KEY");
      return NextResponse.json({
        error: "API key missing",
      });
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "assistant",
            content:
              "Eres un asistente de bienes raíces en colombia y maiami amable y directo",
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 100,
      }),
    });

    const responseText = await res.text();

    if (!res.ok) {
      console.error("Fallo en la respuesta de Groq");
      return NextResponse.json({ error: responseText }, { status: res.status });
    }

    const data = JSON.parse(responseText);
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        {
          error: "Not content form Groq API",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ content });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e.message || "NO_GROQ" },
      { status: 500 }
    );
  }
}
