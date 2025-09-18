import { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    // Add user message
    setMessages([...messages, { sender: "You", text: input }]);

    // Send to backend
    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
        
    // Add AI reply
    setMessages((prev) => [...prev, { sender: "AI", text: data.reply }]);
    setInput("");
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-3">💬 Arogya_Sathi</h2>

      <div className="h-64 overflow-y-auto border p-3 mb-3 bg-gray-50 rounded-md">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === "You" ? "text-blue-600" : "text-green-700"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-md p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
