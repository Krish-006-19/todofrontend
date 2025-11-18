# Todo Frontend (Vite + React)

This is a minimal React frontend for the provided Todo backend. It uses cookie-based auth (the backend sets `accessToken` cookie), so fetch requests include credentials.

Quick start:

1. Install dependencies:

```powershell
cd todo-frontend
npm install
```

2. Run dev server (Vite defaults to port 5173):

```powershell
npm run dev
```

3. Point the frontend to the backend:

- By default the frontend will use `http://localhost:3000` as the API base. If your backend runs on a different URL, set the `VITE_API_URL` environment variable, for example:

```powershell
$env:VITE_API_URL = 'http://localhost:4000'; npm run dev
```

Notes:
- Login uses `/login` and `/register` endpoints and relies on cookies (`credentials: 'include'`).
- The frontend expects the backend to allow CORS from `http://localhost:5173` (the backend already has this origin in CORS config).
