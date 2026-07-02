import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

// route test
app.get("/", (req, res) => {
  res.send("API en ligne 🚀");
});

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

// IMPORTANT POUR RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Serveur lancé sur port " + PORT);
});
