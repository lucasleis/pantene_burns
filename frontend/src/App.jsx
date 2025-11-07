import { useState } from "react";

function App() {
  const [form, setForm] = useState({ name: "", hairStyle: "", mood: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/generate-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message || "Error al generar el texto");
    } catch (err) {
      setMessage("Ocurrió un error. Intentalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "3rem auto", fontFamily: "sans-serif" }}>
      <h1>✨ Wrap Pantene ✨</h1>
      <p>Completá el formulario para generar tu mensaje personalizado</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="hairStyle"
          placeholder="Cómo llevás el pelo"
          value={form.hairStyle}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mood"
          placeholder="Tu energía para 2026"
          value={form.mood}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generando..." : "Crear mi Wrap Pantene"}
        </button>
      </form>

      {message && (
        <div style={{ marginTop: "2rem", padding: "1.5rem", background: "#f6f6f6", borderRadius: "12px" }}>
          <h3>Tu mensaje:</h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
