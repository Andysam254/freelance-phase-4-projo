import React, { useState, useEffect } from "react";

const Chat = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch Messages
  useEffect(() => {
    fetch(`/messages/${senderId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [senderId]);

  // Handle Send Message
  const handleSend = async () => {
    if (!newMessage.trim()) return;
    
    const messageData = {
      sender_id: senderId,
      receiver_id: receiverId,
      content: newMessage,
    };

    const res = await fetch("/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    });

    if (res.ok) {
      setMessages([...messages, messageData]);
      setNewMessage("");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>

      {/* Messages Display */}
      <div className="border p-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.sender_id === senderId ? "text-right" : "text-left"}`}>
            <span className="bg-gray-100 p-2 rounded">{msg.content}</span>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 flex-grow rounded-l-lg"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
