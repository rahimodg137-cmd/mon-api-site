import express from "express";
import cors from "cors";
import fetch from "node-fetch";

import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());

/* ===== IMPORTANT : chemin pour fichiers statiques ===== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===== Sert ton site HTML (public/index.html) ===== */
app.use(express.static(path.join(__dirname, "public")));

/* ===== Page principale ===== */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ===== Ton API chat ===== */
const API_KEY = process.env.API_KEY;

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const response = await fetch("https://api.exemple.com/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

/* ===== PORT Render ===== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Serveur lancé sur port " + PORT);
});
