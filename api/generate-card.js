// api/generate-card.js
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { name, hairStyle, mood } = req.body;

    const prompt = `
    Generá un texto inspiracional estilo Pantene para una persona llamada ${name},
    con peinado ${hairStyle} y estado de ánimo ${mood}.
    Hacelo aspiracional, breve y con tono positivo.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error en generate-card:", error);
    res.status(500).json({ error: error.message });
  }
}
