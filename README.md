# 📦 MyDropzone

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://vercel.com)
[![License](https://img.shields.io/github/license/siddhesh-wagh/mydropzone)](./LICENSE)
[![Made with React](https://img.shields.io/badge/frontend-react-blue)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/backend-express-lightgrey)](https://expressjs.com/)

**MyDropzone** is a full-stack file upload and management app built with React and Express. It provides a seamless drag-and-drop interface for uploading files, alongside secure authentication and simple file browsing, downloading, and deletion.

---

## 🚀 Features

- 🔐 JWT-based login and token authentication
- 📤 Drag & drop or manual file selection
- 📁 File preview and management
- ⬇️ Secure file downloads with token protection
- 🗑️ Authenticated file deletion
- 🌍 Live frontend hosted on Vercel

---

## 🧠 Tech Stack

- **Frontend:** React, CSS Modules
- **Backend:** Node.js, Express, Multer
- **Auth:** JWT (JSON Web Tokens)
- **Hosting:** Vercel (Frontend), Render (Backend)

---

## 📁 Project Structure

```
mydropzone/
├── backend/
│   ├── index.js             # Main Express server
│   ├── middleware/          # Auth middleware
│   ├── routes/              # API routes (upload, auth, files)
│   ├── uploads/             # Uploaded files storage
│   └── utils/               # Utility functions
│
└── frontend/
    ├── public/              # Static assets
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── context/         # AuthContext for JWT
    │   ├── pages/           # UploadPage, DownloadPage, LoginPage
    │   ├── App.js           # Main React app
    │   └── index.js         # React entry point
    └── .env                 # API URL config (ignored from repo)
```

---

## 💻 Getting Started

Clone the repository:

```bash
git clone https://github.com/siddhesh-wagh/mydropzone.git
```

Setup backend and frontend separately with `npm install` and start servers using `npm start`.

---

## 🌍 Live Demo

🔗 [https://mydropzone.vercel.app](https://mydropzone.vercel.app)

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

## 🙌 Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Render](https://render.com/)
- [Vercel](https://vercel.com/)

## 🤝 Credits

Built by [@siddhesh-wagh](https://github.com/siddhesh-wagh)  
With 💙 using **React** + **Express**
