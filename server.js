const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// CHAT API (OpenRouter → GPT models)
app.post("/chat", async (req, res) => {
    try {
        const userMsg = req.body.message;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [{ role: "user", content: userMsg }]
            })
        });

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });

    } catch (err) {
        res.json({ reply: "Server error!" });
    }
});

// TTS (ElevenLabs clone later added)
app.post("/tts", async (req, res) => {
    res.json({ msg: "TTS backend baad me connect hoga" });
});

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});