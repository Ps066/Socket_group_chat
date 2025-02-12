# Socket Chat App

A real-time chat application built using **Socket.IO**, **Node.js**, and **Express**. This application allows users to join chat rooms and send messages to each other in real time. It features a simple and intuitive UI to facilitate communication.

## Features

- Real-time messaging: Users can send and receive messages instantly.
- Multiple chat rooms: Users can create and join different rooms to chat with others.
- User authentication (optional): Users can log in to identify themselves in the chat.
- Responsive UI: Optimized for desktop and mobile devices.
  
## Technologies Used

- **Frontend**:
  - React
  - Socket.IO client
- **Backend**:
  - Node.js
  - Express
  - Socket.IO server
  
## Setup Instructions

### Prerequisites

- Node.js and npm installed. (Download from [Node.js official website](https://nodejs.org/))

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/socket-chat-app.git
3. Navigate to the project directory:
4. Install the required dependencies:
5. Start the development server:
6. Open your browser and navigate to http://localhost:3000 to access the chat app.

1. Clone the repository to your local machine:
   
2. Navigate to the project directory:

  ```bash
  cd socket-chat-app
  ```
Install the required dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm start
Open your browser and navigate to http://localhost:3000 to access the chat app.

How to Use
Once the app is running, open it in multiple browser tabs to simulate multiple users.
Enter a room name or join an existing room.
Start chatting with other users in the same room in real time.
Code Overview
server.js: Main server file where the Express app and Socket.IO server are initialized.
public/index.html: Frontend HTML structure.
public/styles.css: CSS for the basic layout and styling of the chat interface.
public/app.js: JavaScript handling the Socket.IO events, connecting users, and handling messages.
Future Enhancements
User authentication via JWT or OAuth.
Private messaging feature.
Saving chat history.
Adding a database (MongoDB) to store rooms and user data.
Contributing
Feel free to fork the repository, submit issues, and send pull requests if you'd like to contribute improvements or bug fixes.

License
This project is licensed under the MIT License - see the LICENSE file for details.
