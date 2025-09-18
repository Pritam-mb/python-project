import { useState, useRef, useEffect } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "You", text: input }]);

    try {
      // Send to backend
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("Failed to fetch from backend");

      const data = await res.json();

      // Add AI reply
      setMessages((prev) => [...prev, { sender: "assitance", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "AI", text: "Error: Unable to connect to server." }]);
      console.error(err);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="max-w-full mt-5 p-6 border rounded-2xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">💬 Arogya_Sathi</h2>

      <div className="h-80 overflow-y-auto border p-3 mb-3 bg-gray-50 rounded-md space-y-2">
  {messages.map((msg, idx) => (
    <div
      key={idx}
      className={`p-2 rounded-lg max-w-[80%] ${
        msg.sender === "You"
          ? "bg-blue-100 text-blue-800 self-end ml-auto text-right hover:bg-blue-200 transition"
          : "bg-green-100 text-green-800 self-start text-left hover:bg-green-200 transition"
      }`}
    >
      {msg.sender === "You" ? (
        <>
          <span>{msg.text}</span> <strong>:{msg.sender}</strong>
        </>
      ) : (
        <>
          <strong>{msg.sender}:</strong> <span>{msg.text}</span>
        </>
      )}
    </div>
  ))}
  <div ref={messagesEndRef} />
</div>


      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-600 transition transform hover:scale-105"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
