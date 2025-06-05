# 💼 Vedant Mohol - Portfolio Website

This is a personal portfolio website built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Tailwind CSS** for styling. The website showcases my **technical skills**, **projects**, **work experience**, and **contact information** in a clean, responsive design.

## 🚀 Features

- Interactive and responsive UI with Tailwind CSS
- Fully functional contact form
- Showcases projects with images and descriptions
- Downloadable resume
- Admin panel to update portfolio contents dynamically
- Deployed using platforms like **Render**.

## 🛠️ Tech Stack

**Frontend**:
- React.js (with Vite)
- Tailwind CSS
- JSX

**Backend**:
- Node.js
- Express.js

**Database**:
- MongoDB (Atlas)

**Deployment**:
- Frontend, Backend: Netlify or Render

## 🧑‍💻 Getting Started (Local Development)

### Step 1: Clone the Repository
git clone https://github.com/vedantmohol/vedant.1314.git
cd vedant.1314

### Step 2: Set Up Frontend
cd frontend
npm create vite@latest

# Choose React as the framework
cd your-vite-project
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Update tailwind.config.js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

Add Tailwind directives to index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

Start the frontend
npm run dev

### Step 3: Set Up Backend
cd backend
npm init -y
npm install express mongoose cors dotenv
Create a basic server.js and set up routes.

Start the backend
node server.js
Make sure MongoDB is connected using a .env file with your credentials.

### Step 4: Environment Variables
Create a .env file in your backend root:

MONGO_URI=your_mongodb_connection_string
PORT=4000

