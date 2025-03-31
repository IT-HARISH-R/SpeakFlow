import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaMicrophone, FaSpinner } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { axiosInstance } from "../lib/axios";

const Comunicate = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    
    const { transcript, listening, resetTranscript } = useSpeechRecognition();

    useEffect(() => {
        if (transcript) {
            sendMessage(transcript);
            resetTranscript();
        }
    }, [transcript]);

    useEffect(() => {
        SpeechRecognition.startListening({ continuous: false, language: "en-US" });
        const timer = setTimeout(() => setShowIntro(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const sendMessage = async (message) => {
        if (!message.trim()) return;
        
        setLoading(true);
        const newMessages = [...messages, { text: message, type: "user" }];
        setMessages(newMessages);

        try {
            const res = await axiosInstance.post("/chat", { message });
            const botMessage = { text: res.data.reply, type: "bot" };
            setMessages([...newMessages, botMessage]);
            speakMessage(res.data.reply);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleVoiceInput = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening({ continuous: false, language: "en-US" });
        }
    };

    const speakMessage = (message) => {
        const speech = new SpeechSynthesisUtterance(message);
        speech.lang = "en-US";
        window.speechSynthesis.speak(speech);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg relative">
                {showIntro && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg"
                    >
                        Say Hi 👋
                    </motion.div>
                )}

                <h2 className="text-xl font-bold text-center">🗣️ Communication Trainer</h2>
                <div className="h-64 overflow-y-auto border p-3 rounded-lg mt-4">
                    {messages.map((msg, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: msg.type === "bot" ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={msg.type === "bot" ? { scale: 1.1, rotate: 2 } : {}} 
                            transition={{ duration: 0.3 }}
                            className={`p-2 my-2 rounded-lg w-fit max-w-[80%] ${msg.type === "bot" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"} text-center`}
                        >
                            {msg.text}
                        </motion.div>
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center mt-4">
                    <motion.button 
                        className={`p-4 rounded-full flex items-center justify-center shadow-lg transition-all 
                            ${listening ? "bg-red-500 animate-pulse" : "bg-blue-500"}
                            text-white`}
                        onClick={handleVoiceInput}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaMicrophone size={24} />
                    </motion.button>
                    <span className={`mt-2 text-sm font-semibold ${listening ? "text-red-500" : "text-gray-600"}`}>
                        {listening ? "Listening..." : "Tap to Speak"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Comunicate;
