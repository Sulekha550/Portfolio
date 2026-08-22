# Sulekha Chauhan — Full Stack Personal Portfolio

Submission-ready full-stack personal portfolio built with React + Vite, Node.js + Express and MongoDB.

## Requirements covered
- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Live-ready architecture for Vercel/Netlify + Render/Railway
- Dynamic project CRUD
- Contact form stored in MongoDB
- Admin dashboard
- Responsive UI

## Project structure

Sulekha_Portfolio_FULL/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Admin.jsx
│   │   ├── Login.jsx
│   │   ├── main.jsx
│   │   ├── styles.css
│   │   ├── admin.css
│   │   └── login.css
│   ├── index.html
│   ├── package.json
│   └── .env.example
└── backend/
    ├── config/db.js
    ├── controllers/
    ├── models/
    ├── routes/
    ├── server.js
    ├── seed.js
    ├── package.json
    └── .env.example

## Run backend

cd backend
npm install

Create `.env` from `.env.example`:
MONGO_URI=mongodb://127.0.0.1:27017/sulekha_portfolio
PORT=5000
CLIENT_URL=http://localhost:5173

Then:
npm run seed
npm run dev

## Run frontend

Open a second terminal:

cd frontend
npm install

Create `.env`:
VITE_API_URL=http://localhost:5000/api

Then:
npm run dev

Open:
http://localhost:5173

Admin:
http://localhost:5173/admin

Demo admin:
Username: admin
Password: portfolio123

## API endpoints

GET    /api/health
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id

POST   /api/messages
GET    /api/messages

## Deployment

Frontend: Vercel / Netlify
Backend: Render / Railway
Database: MongoDB Atlas

For production, replace the demo admin login with real backend authentication.
