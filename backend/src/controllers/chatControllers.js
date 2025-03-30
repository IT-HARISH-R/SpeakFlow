import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { GEMINI_API_KEY } from "../utlis/config.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const chatController = { 
    chatRes: async (req, res) => {
        try {
            const { message } = req.body;

            // ✅ Use the correct model name
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

            // ✅ Correct API request format
            const result = await model.generateContent({
                contents: [{ role: "user", parts: [{ text: message }] }]
            });

            // ✅ Extract response properly
            // const response = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
            const response = result;
            console.log(response)
            res.json({ reply: response });

        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Failed to fetch response from Gemini AI" });
        }
    }
};

export default chatController;
