import React, { useState, useEffect, useRef } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const messagesEndRef = useRef(null);

  const API_URL = "https://example.com/chat-data.json"; // Ganti dengan URL JSON

  // Fungsi untuk memuat pesan dari file JSON
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMessages(data);
        if (shouldScrollToBottom) {
          scrollToBottom();
        }
      } catch (error) {
        console.error("Gagal memuat pesan:", error);
      }
    };

    fetchMessages();
  }, [shouldScrollToBottom]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, 100);
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = {
        message: message.trim(),
        timestamp: new Date().toISOString(),
        sender: { image: "/AnonimUser.png" },
      };

      // Tambahkan pesan baru secara lokal
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);

      // Kirim pesan ke file JSON
      try {
        await fetch(API_URL, {
          method: "POST", // Pastikan backend mendukung metode POST
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMessages),
        });
      } catch (error) {
        console.error("Gagal mengirim pesan:", error);
      }

      setMessage(""); // Hapus pesan dari input
      setShouldScrollToBottom(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="" id="ChatAnonim">
      <div className="text-center text-4xl font-semibold" id="Glow">
        Text Anonim
      </div>

      <div
        className="mt-5"
        id="KotakPesan"
        style={{ overflowY: "auto", height: "400px" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex items-start text-sm py-[1%]"
            style={{ display: "flex", marginBottom: "10px" }}
          >
            <img
              src={msg.sender.image}
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
              className="relative top-[0.30rem]"
              style={{
                backgroundColor: "#f5f5f5",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "75%",
                wordWrap: "break-word",
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div id="InputChat" className="flex items-center mt-5">
        <input
          className="bg-transparent flex-grow pr-4 w-4 placeholder:text-white placeholder:opacity-60"
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
            border: "1px solid #ddd",
            outline: "none",
          }}
        />
        <button onClick={sendMessage} className="ml-2">
          <img
            src="/paper-plane.png"
            alt="Kirim"
            className="h-4 w-4 lg:h-6 lg:w-6"
            style={{ cursor: "pointer" }}
          />
        </button>
      </div>
    </div>
  );
}

export default Chat;
