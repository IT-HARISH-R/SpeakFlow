import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
 
const chatController = {
    chatRes: async (req, res) => {
        try {
            const { message } = req.body;

            // Use the correct method to get the model
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            // Generate response
            const result = await model.generateContent(message);
            const response = result.response.text();

            res.json({ reply: response });

        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Failed to fetch response from Gemini AI" });
        }
    }
};

export default chatController;
 