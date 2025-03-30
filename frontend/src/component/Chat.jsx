import { useState, useEffect, useRef } from "react";
import { axiosInstance } from "../lib/axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format AI response text to support markdown-like styles
  const formatText = (text) => {
    return text
      .replace(/\*\*\*(.*?)\*\*\*/g, "<b><i>$1</i></b>") // ***Bold Italic***
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // **Bold**
      .replace(/\*(.*?)\*/g, "<i>$1</i>") // *Italic*
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 text-white p-2 rounded-lg">$1</pre>') // Code Blocks
      .replace(/`(.*?)`/g, '<code class="bg-gray-200 p-1 rounded">$1</code>'); // Inline Code
  };

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
      const response = await axiosInstance.post("/chat", { message: input });

      const botReply =
        response?.data?.reply?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm not sure how to respond to that.";

      const botMessage = {
        id: messages.length + 2,
        sender: "SpeakFlow AI",
        text: botReply,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response", error);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          sender: "Error",
          text: "⚠️ Failed to get a response. Please try again.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 ">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center p-4 font-semibold shadow-md text-2xl lg:text-5xl">
        GemBat  AI Chat
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3 container mx-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 max-w-md shadow-md rounded-lg ${msg.sender === "User" ? "bg-blue-500 text-white" : "bg-white text-gray-800"
                }`}
            >
              <p dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}></p>
              {/* <span className="text-black text-xs block mt-1">{msg.time}</span> */}
            </div>
          </div>
        ))}
        {loading && <p className="text-gray-500 text-sm text-center">GemBat AI is analyzing your query...</p>}
        <div ref={chatEndRef} />
      </main>

      {/* Input Field */}
      <footer className="bg-white border-t p-4 flex container mx-auto rounded-t-2xl">
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
          className="p-2 bg-blue-600 text-white rounded-full ml-2 hover:bg-blue-700 transition"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Chat;
