import React from "react";
import "./App.css";
import Chat from "pages/Room/Room";
import Room from "pages/Room/Room";
import io from "socket.io-client";

const App = () => {
  // const socket = io("http://localhost:8000");
  // Example: Sending a message from frontend to backend
  // socket.emit("chat message", "Hello from the frontend!");

  // Example: Receiving a message from backend
  // socket.on("chat message", (msg) => {
  //   console.log("Message from server:", msg);
  // });

  return (
    <div className="App">
      <Room />
    </div>
  );
};

export default App;
