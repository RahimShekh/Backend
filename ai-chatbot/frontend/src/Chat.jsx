import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Connect to your backend
const socket = io("http://localhost:3000");

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for AI response
    socket.on("ai-message-response", (data) => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.response },
      ]);
    });

    return () => {
      socket.off("ai-message-response");
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    // add user message to UI
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
    ]);

    // send to backend
    socket.emit("ai-message", { prompt: input });

    setInput("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>AI Chat</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#4CAF50" : "#222",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "40px auto",
    fontFamily: "Arial",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  chatBox: {
    height: "400px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  message: {
    padding: "10px",
    maxWidth: "70%",
    color: "white",
    borderRadius: "10px",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
  },
};
