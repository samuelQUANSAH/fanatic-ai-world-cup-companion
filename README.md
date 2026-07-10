# FanaticAI — World Cup Rivalry Obsession Engine

An interactive AI companion for devoted football fans to track sentiment, calculate fan passion index metrics, and simulate sports rivalries using the **Google Gemini API**.

Built for the **DEV Weekend Challenge: Passion Edition** (Best Use of Google AI Category).

---

## 🚀 How It Works
* **Rant Analyzer**: Uses Gemini to evaluate sports rant inputs, compute a passion score (0-100), and generate supportive analyst summaries.
* **Rivalry Simulator**: Simulates high-emotion commentary of matches with fan loyalty configuration.

## 🛠️ Stack
* **AI Platform**: Google Gemini 1.5 Flash (google-generativeai SDK)
* **Backend**: FastAPI (Python), Uvicorn
* **Frontend**: React, TS, Vite, Tailwind CSS v4, Framer Motion

---

## 📂 Repository Layout
* **`backend/`**: FastAPI routers, schemas, and Gemini integration handlers.
* **`frontend/`**: Command Center dashboard with interactive sentiment gauges.
* **`docs/`**: Holds the DEV Community submission templates (`dev_submission.md`).

---

## 💻 Local Setup & Run

### 1. Configure Environment (Backend)
Add your Google AI Studio API Key to a `.env` file in the `backend/` directory:
```bash
GEMINI_API_KEY=AIzaSy...
```
*(If no API key is provided, the application defaults to local sandbox mock data automatically).*

### 2. Boot Backend API
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Backend will listen at: **`http://localhost:8080`**

### 3. Boot React Dashboard
```bash
cd ../frontend
npm install
npm run dev
```
Dashboard will open at: **`http://localhost:5173`**
