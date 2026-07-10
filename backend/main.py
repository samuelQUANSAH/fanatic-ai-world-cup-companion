import os
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load environmental configs
load_dotenv()

from services.gemini import generate_rivalry_commentary, analyze_fan_rant

# Setup logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("FanaticAI")

app = FastAPI(
    title="FanaticAI World Cup Companion API",
    description="Backend microservice using Google AI Gemini API to calculate fan obsession metrics and simulate match rivalries.",
    version="1.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RivalryPayload(BaseModel):
    team_a: str = Field(..., example="Brazil")
    team_b: str = Field(..., example="Argentina")
    bias_team: str = Field(..., example="Brazil")

class RantPayload(BaseModel):
    rant: str = Field(..., example="WE WERE ROBBED! THAT WAS NEVER A PENALTY!")

@app.post("/api/rivalry/simulate")
async def simulate_rivalry(payload: RivalryPayload):
    """Simulates legendary match rivalry commentary using Google Gemini API."""
    try:
        commentary = generate_rivalry_commentary(
            team_a=payload.team_a,
            team_b=payload.team_b,
            bias_team=payload.bias_team
        )
        return {
            "team_a": payload.team_a,
            "team_b": payload.team_b,
            "bias_team": payload.bias_team,
            "commentary": commentary
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate commentary: {e}")

@app.post("/api/rant/analyze")
async def analyze_rant(payload: RantPayload):
    """Analyzes fan rants to output a passion score and emotional summary using Gemini."""
    try:
        result = analyze_fan_rant(payload.rant)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze rant: {e}")

@app.get("/api/health")
async def health():
    return {
        "status": "HEALTHY",
        "gemini_api_configured": os.getenv("GEMINI_API_KEY") is not None
    }

@app.get("/")
async def root():
    return {
        "app": "FanaticAI Companion API",
        "health": "/api/health",
        "endpoints": {
            "simulate_rivalry": "/api/rivalry/simulate (POST)",
            "analyze_rant": "/api/rant/analyze (POST)"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
