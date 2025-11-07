// api/generate-card.js
import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const { name, hairStyle, mood } = await req.json();

    const prompt = `
    Generá un texto inspiracional estilo Pantene para una persona llamada ${name},
    con peinado ${hairStyle} y estado de ánimo ${mood}.
    Hacelo aspiracional, breve y con tono positivo.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return new Response(
      JSON.stringify({ message: completion.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
