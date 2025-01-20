import React, { useState, useEffect, useRef } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const API_URL = "https://example.com/chat-data.json"; // URL file JSON Anda

  // Mengambil pesan dari file JSON
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMessages(data);
        scrollToBottom();
      } catch (error) {
        console.error("Gagal memuat pesan:", error);
      }
    };
    fetchMessages();
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = {
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);

      try {
        await fetch(API_URL, {
          method: "POST", // Backend server diperlukan untuk menangani POST
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMessages),
        });
      } catch (error) {
        console.error("Gagal mengirim pesan:", error);
      }

      setMessage("");
      scrollToBottom();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-gray-900 text-white p-5 rounded-md shadow-md" id="ChatAnonim">
      <div className="text-center text-4xl font-semibold mb-5" id="Glow">
        Text Anonim
      </div>

      <div
        className="mt-5 border border-gray-700 rounded-md p-4 overflow-y-auto"
        id="KotakPesan"
        style={{ maxHeight: "300px" }}
      >
        {messages.map((msg, index) => (
          <div key={index} className="flex items-start text-sm py-2">
            <img
              src="/AnonimUser.png"
              alt="User Profile"
              className="h-7 w-7 mr-2 rounded-full border border-gray-600"
            />
            <div className="bg-gray-800 p-2 rounded-lg">
              <div>{msg.message}</div>
              <small className="text-gray-500 block mt-1">
                {new Date(msg.timestamp).toLocaleString()}
              </small>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex items-center mt-5 border border-gray-700 rounded-md p-2" id="InputChat">
        <input
          className="bg-transparent flex-grow pr-4 placeholder-gray-400 focus:outline-none"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ketik pesan Anda..."
          maxLength={60}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}

export default Chat;
