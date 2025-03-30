import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      sender: "User",
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/chat", { message: input });

      // ✅ Extract correct response text
      const botReply =response.data.reply.response.candidates[0].content.parts[0].text
      console.log('ll',botReply)
      const botMessage = {
        id: messages.length + 2,
        sender: "SpeakFlow AI",
        text: botReply,
        time: new Date().toLocaleTimeString(),
      };

      console.log(response);
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response", error);
      setMessages((prev) => [...prev, { id: messages.length + 2, sender: "Error", text: "Failed to get response. Try again.", time: new Date().toLocaleTimeString() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white text-center p-4 font-semibold shadow-md">
        SpeakFlow AI Chat
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 max-w-md shadow-md rounded-lg ${msg.sender === "User" ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`}>
              <p>{msg.text}</p>
              <span className="text-gray-500 text-xs block mt-1">{msg.time}</span>
            </div>
          </div>
        ))}
        {loading && <p className="text-gray-500 text-sm text-center">SpeakFlow AI is typing...</p>}
        <div ref={chatEndRef} />
      </div>

      {/* Input Field */}
      <div className="bg-white border-t p-4 flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-600 text-white rounded-full ml-2 hover:bg-blue-700 transition">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
