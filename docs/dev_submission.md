# FanaticAI — World Cup Rivalry Obsession Engine (Powered by Google Gemini)

## Submission Category
**Best Use of Google AI**

---

## 🏆 Project Link
* **GitHub Repository**: [samuelQUANSAH/fanatic-ai-world-cup-companion](https://github.com/samuelQUANSAH/fanatic-ai-world-cup-companion)

---

## 💡 What We Built & Inspiration
Football is not just a game; it is an obsession. It is late-night arguments, heartbreak, the rivalry that splits cities, and the pure joy of a last-minute goal. With the ongoing World Cup, that passion is everywhere.

**FanaticAI** is a companion web application designed for devoted football fans to celebrate their fandom. It features:
1. **Fan Rant Sentiment Analyzer**: Type your raw, unfiltered, emotional match rants. Google Gemini analyzes the sentiment and calculates your **Passion Index (0-100%)** alongside supportive commentator responses.
2. **Rivalry Simulator Console**: Pick historic teams (e.g. Brazil, Argentina, Germany, England, France), configure your fan loyalty, and watch Gemini stream highly biased, emotional, audio-ready live game commentary.

---

## 🛠️ How We Built It (The Stack)
* **AI Model**: **Google Gemini 1.5 Flash** (via `google-generativeai` SDK)
* **Backend API**: **FastAPI** (Python), **Uvicorn**
* **Frontend UI**: **React**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Framer Motion**

---

## 🧠 Gemini Integration Highlights

### 1. The Passion Index Calculation
We prompt Gemini 1.5 Flash to analyze text structures and output clean JSON data mapping passion indicators:
```python
prompt = (
    f"Analyze the following sports fan rant text: '{rant}'. "
    f"Calculate a 'passion_score' representing how obsessed, devoted, and emotional the fan is on a scale from 0 to 100. "
    f"Also write a brief 1-sentence supportive response acknowledging their obsession. "
    f"Return ONLY a clean JSON object with keys: 'passion_score' (integer) and 'response_summary' (string)."
)
```

### 2. Biased Rivalry Commentary Stream
By injecting specific commentator persona context, Gemini produces highly emotional match descriptions:
```python
prompt = (
    f"You are a fanatical, obsessed football commentator who is highly devoted to {bias_team}. "
    f"Generate a brief, emotional, 3-sentence live commentary stream of a hypothetical match "
    f"between {team_a} and {team_b}. Your tone must show absolute passion, bias, and excitement!"
)
```

---

## 🚀 Setup & Installation
Run the backend:
```bash
cd backend
pip install -r requirements.txt
python main.py
```

Run the frontend:
```bash
cd frontend
npm install
npm run dev
```
