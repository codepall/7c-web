import React, { useState, useEffect, useRef } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const API_URL = "https://example.com/chat-data.json"; // Ganti dengan URL file JSON Anda

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
    <div className="" id="ChatAnonim" style={{ fontFamily: "Arial, sans-serif" }}>
      <div
        className="text-center text-4xl font-semibold"
        id="Glow"
        style={{
          color: "#fff",
          textShadow: "0 0 10px rgba(255,255,255,0.8)",
        }}
      >
        Text Anonim
      </div>

      <div
        className="mt-5"
        id="KotakPesan"
        style={{
          overflowY: "auto",
          height: "400px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "15px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex items-start text-sm py-[1%]"
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "15px",
            }}
          >
            <img
              src="/AnonimUser.png"
              alt="User Profile"
              className="h-7 w-7 mr-2"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <div
              style={{
                background: "rgba(0,0,0,0.8)",
                padding: "10px 15px",
                borderRadius: "15px",
                color: "#fff",
                maxWidth: "80%",
                wordWrap: "break-word",
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div
        id="InputChat"
        className="flex items-center mt-5"
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          padding: "10px 0",
          borderTop: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ketik pesan Anda..."
          maxLength={60}
          style={{
            flexGrow: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            backdropFilter: "blur(5px)",
            marginRight: "10px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 15px",
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <img
            src="/paper-plane.png"
            alt="Kirim"
            style={{ width: "20px", height: "20px" }}
          />
        </button>
      </div>
    </div>
  );
}

export default Chat;
