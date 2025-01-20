import React, { useState, useEffect, useRef } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const API_URL = "https://7c-web.vercel.app/chat-data.json";

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

      // Menambahkan pesan baru ke daftar lokal
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);

      // Mengirim pesan baru ke server
      try {
        await fetch(API_URL, {
          method: "POST", // Anda memerlukan backend untuk menangani POST
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMessages),
        });
      } catch (error) {
        console.error("Gagal mengirim pesan:", error);
      }

      setMessage(""); // Mengosongkan input
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
    <div className="chat-container">
      <div className="chat-messages" style={{ overflowY: "auto", height: "300px" }}>
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <span>{msg.message}</span>
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ketik pesan Anda..."
        />
        <button onClick={sendMessage}>Kirim</button>
      </div>
    </div>
  );
}

export default Chat;
