import { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      sender: "User",
      text: input,
      time: new Date().toLocaleTimeString(),
    };
    
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000api/v1/chat", { message: input });

      const botMessage = {
        id: messages.length + 2,
        sender: "ChatGPT",
        text: response.data.reply,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching ChatGPT response", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">Chat with ChatGPT</div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start ${msg.sender === "User" ? "justify-end" : ""}`}>
            <div className={`p-3 max-w-md shadow-md rounded-lg ${msg.sender === "User" ? "bg-blue-600 text-white" : "bg-white"}`}>
              <p>{msg.text}</p>
              <span className="text-gray-500 text-xs block mt-1">{msg.time}</span>
            </div>
          </div>
        ))}
        {loading && <p className="text-gray-500 text-sm">ChatGPT is typing...</p>}
      </div>

      {/* Input Field */}
      <div className="bg-white border-t p-4 flex">
        <input 
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="p-2 bg-blue-600 text-white rounded-full">Send</button>
      </div>
    </div>
  );
};

export default Chat;
