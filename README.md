# 🚑 Scan to Save Life

A QR Code-Based Emergency Information Sharing System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

The application allows users to securely store their emergency information and generate a unique QR code. During emergencies, scanning the QR code provides instant access to essential information such as medical history, emergency contacts, vehicle details, and insurance information, helping doctors, police, and emergency responders provide faster assistance.

---

## Features

- User Registration & Login
- JWT Authentication
- Personal Information Management
- Medical History Management
- Vehicle Information Management
- Emergency Contact Management
- Insurance Information
- QR Code Generation
- QR Code Scanning
- Access Control for Shared Information
- Responsive User Interface

---

## Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Axios
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Authentication
- JWT (JSON Web Token)

### Other Libraries
- QR Code Generator
- Multer (File Upload)
- bcrypt.js

---

## Project Structure

```
QR-CodeBased-Emergency-Project/
│
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── Backend/
│   ├── src/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/QR-CodeBased-Emergency-Project.git

cd QR-CodeBased-Emergency-Project
```

---

# Backend Setup

Navigate to backend

```bash
cd Backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file inside the Backend folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

Start backend

```bash
npm start
```

The backend will run on

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal

```bash
cd Frontend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
REACT_APP_API_URL=http://localhost:5000
```

Start frontend

```bash
npm start
```

Frontend runs on

```
http://localhost:3000
```

---

## Running the Project

### Terminal 1

```bash
cd Backend

npm install

npm start
```

### Terminal 2

```bash
cd Frontend

npm install

npm start
```

Open

```
http://localhost:3000
```

---

# Backend
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Frontend
REACT_APP_API_URL=http://localhost:5000

## Deployment

Frontend can be deployed on:

- Render
- Vercel
- Netlify

Backend can be deployed on:

- Render
- Railway

Database:

- MongoDB Atlas

---

## Future Enhancements

- Mobile Application
- Offline QR Access
- AI-based Emergency Assistance
- DigiLocker Integration
- Multi-language Support
- Biometric Authentication

---


