import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

let connection;

export const initializeSignalRConnection = async () => {
  try {
    connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7109/notificationshub", {
        accessTokenFactory: () => localStorage.getItem("token"), 
      })
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("ReceiveNotification", (message) => {
      console.log("Notification received:", message);
     
      showNotification(message); 
    });

    await connection.start();
    console.log("SignalR connection established.");
  } catch (error) {
    console.error("Error establishing SignalR connection:", error);
  }
};

export const stopSignalRConnection = async () => {
  if (connection) {
    await connection.stop();
    console.log("SignalR connection stopped.");
  }
};


const showNotification = (message) => {
  const notificationContainer = document.getElementById("notification-container");
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerText = message;

  notificationContainer.appendChild(notification);

  setTimeout(() => {
    notificationContainer.removeChild(notification);
  }, 5000);
};
