import os
import logging
import google.generativeai as genai

logger = logging.getLogger("FanaticAI.Gemini")

# Configure Google AI Gemini API
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        logger.info("Google AI Gemini service configured successfully.")
    except Exception as e:
        logger.warning(f"Failed to initialize Google Gemini API: {e}. Falling back to sandbox mock data.")
        model = None
else:
    logger.warning("GEMINI_API_KEY environment variable not found. Operating in sandbox mock mode.")
    model = None

def generate_rivalry_commentary(team_a: str, team_b: str, bias_team: str) -> str:
    """Generates passionate and biased match commentary using Gemini."""
    prompt = (
        f"You are a fanatical, obsessed football commentator who is highly devoted to {bias_team}. "
        f"Generate a brief, emotional, 3-sentence live commentary stream of a hypothetical match "
        f"between {team_a} and {team_b}. Your tone must show absolute passion, bias, and excitement!"
    )

    if model:
        try:
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            logger.error(f"Gemini API generation failed: {e}. Falling back to mock commentary.")
    
    # Mock fallback
    return (
        f"OH MY WORD! {bias_team} is absolutely putting on a clinic today! "
        f"The energy in the stands is deafening, and they are completely dominating every single run! "
        f"This is football heritage! Let's go!"
    )

def analyze_fan_rant(rant: str) -> dict:
    """Analyzes a fan rants text sentiment and computes a passion obsession index (0-100)."""
    prompt = (
        f"Analyze the following sports fan rant text: '{rant}'. "
        f"Calculate a 'passion_score' representing how obsessed, devoted, and emotional the fan is on a scale from 0 to 100. "
        f"Also write a brief 1-sentence supportive response acknowledging their obsession. "
        f"Return ONLY a clean JSON object with keys: 'passion_score' (integer) and 'response_summary' (string)."
    )

    if model:
        try:
            response = model.generate_content(
                prompt,
                generation_config={"response_mime_type": "application/json"}
            )
            # Simple JSON parse or return string
            import json
            return json.loads(response.text.strip())
        except Exception as e:
            logger.error(f"Gemini API sentiment analysis failed: {e}. Falling back to mock analysis.")

    # Mock fallback based on string length and exclamation count
    exclamations = rant.count("!")
    score = min(100, 45 + (len(rant) % 25) + (exclamations * 10))
    
    return {
        "passion_score": score,
        "response_summary": "That is the absolute definition of pure football passion! Your devotion is unmatched!"
    }
