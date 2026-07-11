*This is a submission for [Weekend Challenge: Passion Edition](https://dev.to/challenges/weekend-2026-07-09)*

## What I Built
I built **FanaticAI: World Cup Rivalry Obsession Engine**, a companion web application for devoted football (soccer) fans who want to measure their passion and simulate legendary matches. 

The application offers two primary features:
1. **Fan Rant Sentiment Analyzer**: Fans can type their raw, unedited, emotional rants about a match. The engine uses Google Gemini to analyze the text and output a **Passion Index (0-100%)** alongside a custom supportive commentator response.
2. **Rivalry Simulator Console**: Users can choose two legendary national teams (e.g. Brazil vs Argentina) and configure their commentator loyalty bias. Gemini then streams a highly biased, passionate, and audio-ready match commentary stream.

## Demo
* **GitHub Repository**: [samuelQUANSAH/fanatic-ai-world-cup-companion](https://github.com/samuelQUANSAH/fanatic-ai-world-cup-companion)
* **Local Run**: The frontend dev server runs at `http://localhost:5173` and connects to the FastAPI backend gateway running at `http://localhost:8888`.

*(See the `docs/assets/` directory in our repository for screenshots of the dashboard UI and passion gauge in action).*

## Code
{% github samuelQUANSAH/fanatic-ai-world-cup-companion %}

## How I Built It
The application is built using a modern full-stack developer architecture:
* **Backend**: **FastAPI** (Python) and **Uvicorn** for fast asynchronous endpoints. We integrated the official **Google Generative AI SDK** (`google-generativeai`) to connect to the `gemini-1.5-flash` model.
* **Frontend**: **React**, **Vite**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion** for a premium, responsive, dark-mode neon dashboard.

### 🧠 Gemini Prompts & Integration

#### 1. Structured JSON Passion Score Estimation
We instruct Gemini to output structured JSON data directly by passing a precise scoring template:
```python
prompt = (
    f"Analyze the following sports fan rant text: '{rant}'. "
    f"Calculate a 'passion_score' representing how obsessed, devoted, and emotional the fan is on a scale from 0 to 100. "
    f"Also write a brief 1-sentence supportive response acknowledging their obsession. "
    f"Return ONLY a clean JSON object with keys: 'passion_score' (integer) and 'response_summary' (string)."
)
```
In the backend services, we configured `generation_config={"response_mime_type": "application/json"}` to guarantee a clean, parseable JSON block returned to the React frontend.

#### 2. PERSONA-Biased Commentary Generation
To capture the real feeling of sports rivalries, we feed Gemini a commentator persona biased towards a specific team:
```python
prompt = (
    f"You are a fanatical, obsessed football commentator who is highly devoted to {bias_team}. "
    f"Generate a brief, emotional, 3-sentence live commentary stream of a hypothetical match "
    f"between {team_a} and {team_b}. Your tone must show absolute passion, bias, and excitement!"
)
```

## Prize Categories
* **Best Use of Google AI**: The entire system logic is powered by **Google Gemini 1.5 Flash** to perform structured sentiment scoring and persona-driven creative content generation.
