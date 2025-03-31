import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { GEMINI_API_KEY } from "../utlis/config.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const chatController = {
    chatRes: async (req, res) => {
        try {
            const { message } = req.body;
            let userMessage = message;

            // Custom Response for "Hi"
            if (userMessage.toLowerCase() === "hi") {
                userMessage = "I'm your communication trainer. Are you ready? And say hi,.";
            }

            if (userMessage.toLowerCase() === "hello") {
                userMessage = "I'm your communication trainer. Are you ready? And say hello,.";
            }

            // Initialize Gemini Model
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

            // Generate AI Response
            const result = await model.generateContent([userMessage]);

            // Extract Response Text
            const response = result?.response?.text() || "No response received.";
            console.log(response);

            res.json({ reply: response });

        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Failed to fetch response from Gemini AI" });
        }
    }

};

export default chatController;
