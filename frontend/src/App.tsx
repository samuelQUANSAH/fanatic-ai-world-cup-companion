import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Activity, 
  MessageSquareCode, 
  Send,
  Flag,
  RotateCcw
} from 'lucide-react';

const BACKEND_URL = 'http://localhost:8888'; // Custom fallback or 8080

export default function App() {
  const [teamA, setTeamA] = useState('Brazil');
  const [teamB, setTeamB] = useState('Argentina');
  const [biasTeam, setBiasTeam] = useState('Brazil');
  const [rantText, setRantText] = useState("WE WERE ROBBED! THAT WAS NEVER A PENALTY! Argentina is paying the ref, I swear! Yellow card?! That was a red card tackle all day! My heart rate is 180 right now! Let's go Brazil!");
  const [passionScore, setPassionScore] = useState(85);
  const [responseSummary, setResponseSummary] = useState("Unbelievable levels of devotion! Your football passion index is highly active.");
  const [simulatedCommentary, setSimulatedCommentary] = useState("OH MY WORD! Brazil is running absolute circles around Argentina! The fans are setting off flares in the stands! Neymar makes a run down the wing, passes to Vinicius, AND HE SCORES! The stadium has erupted!");
  const [loadingSim, setLoadingSim] = useState(false);
  const [loadingRant, setLoadingRant] = useState(false);
  const [apiOnline, setApiOnline] = useState(false);

  // Check health on startup
  const checkHealth = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/health`);
      if (res.ok) {
        setApiOnline(true);
      } else {
        setApiOnline(false);
      }
    } catch {
      setApiOnline(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const handleSimulate = async () => {
    setLoadingSim(true);
    if (apiOnline) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/rivalry/simulate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ team_a: teamA, team_b: teamB, bias_team: biasTeam })
        });
        const data = await res.json();
        setSimulatedCommentary(data.commentary);
      } catch {}
    } else {
      // Mock local simulation
      setTimeout(() => {
        setSimulatedCommentary(
          `GOAAAL! The obsessed ${biasTeam} fans are absolute maniacs! Even with ${teamA === biasTeam ? teamB : teamA} trying to slow the tempo, ` +
          `the pure passion from the ${biasTeam} midfield has blown the defense wide open! It is absolute footballing poetry!`
        );
        setLoadingSim(false);
      }, 800);
      return;
    }
    setLoadingSim(false);
  };

  const handleAnalyzeRant = async () => {
    setLoadingRant(true);
    if (apiOnline) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/rant/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rant: rantText })
        });
        const data = await res.json();
        setPassionScore(data.passion_score);
        setResponseSummary(data.response_summary);
      } catch {}
    } else {
      // Mock local sentiment analysis
      setTimeout(() => {
        const score = Math.min(100, 50 + (rantText.length % 30) + (rantText.count ? 0 : rantText.split('!').length * 8));
        setPassionScore(score);
        setResponseSummary(
          score > 80 
            ? "WARNING: Fanatic levels of passion detected. Seek immediate cooling, or continue screaming!"
            : "Strong passion detected. Your support keeps the stadium alive."
        );
        setLoadingRant(false);
      }, 700);
      return;
    }
    setLoadingRant(false);
  };

  return (
    <div className="min-h-screen bg-[#05000a] text-white p-6 flex flex-col justify-between">
      
      {/* Header Banner */}
      <header className="glass rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-brand-neon-purple/20 rounded-lg border border-brand-neon-purple/40">
            <Trophy className="w-6 h-6 text-brand-neon-purple animate-bounce" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-2xl uppercase tracking-wider text-gradient-neon">
              FanaticAI
            </h1>
            <p className="text-white/40 text-xs mt-0.5 font-light">
              World Cup Rivalry Obsession Engine — DEV Weekend Challenge Entry
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          <span className={`w-2.5 h-2.5 rounded-full ${apiOnline ? 'bg-brand-neon-green' : 'bg-brand-neon-red'}`} />
          <span className="text-xs text-white/50 font-mono">
            {apiOnline ? 'Gemini API Hook Active' : 'Offline Sandbox Sandbox'}
          </span>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        
        {/* Left Panel: Rant Obsession Meter */}
        <div className="lg:col-span-5 glass rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-neon-purple flex items-center gap-2">
              <Flame className="w-4 h-4 text-brand-neon-red animate-pulse" />
              Fan Rant Sentiment Analyzer
            </h2>
            <p className="text-xs text-white/50 font-light">
              Type your raw, unedited game rants. Google Gemini will calculate your Fanatic Obsession score (0-100) and respond with matching support.
            </p>

            <textarea
              value={rantText}
              onChange={(e) => setRantText(e.target.value)}
              className="w-full h-36 bg-black/60 border border-brand-neon-purple/20 focus:border-brand-neon-purple rounded-lg p-3 text-xs focus:outline-none transition font-sans"
              placeholder="Inject your rants..."
            />

            <button
              onClick={handleAnalyzeRant}
              disabled={loadingRant}
              className="w-full py-2.5 bg-brand-neon-purple hover:bg-brand-neon-purple/80 text-white text-xs font-semibold rounded-lg transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              {loadingRant ? 'Analyzing Sentiment...' : 'Analyze Rant Passion'}
            </button>
          </div>

          {/* Obsession Gauge Visualizer */}
          <div className="mt-8 border-t border-brand-neon-purple/10 pt-6 flex flex-col items-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer circular indicator */}
              <div className="absolute inset-0 rounded-full border-4 border-white/5" />
              <div 
                className="absolute inset-0 rounded-full border-4 border-brand-neon-purple/40 animate-pulse"
                style={{ clipPath: `polygon(50% 50%, -50% -50%, ${passionScore}% -50%, ${passionScore}% 150%, -50% 150%)` }}
              />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-heading font-extrabold text-brand-neon-red font-mono">
                  {passionScore}%
                </span>
                <span className="text-[10px] uppercase text-white/40 tracking-wider font-mono">Passion Index</span>
              </div>
            </div>
            
            <div className="bg-black/40 border border-brand-neon-purple/15 p-3 rounded-lg mt-6 w-full text-center">
              <span className="text-[9px] uppercase tracking-wider text-brand-neon-purple font-mono block mb-1">
                Gemini Analyst Assessment
              </span>
              <p className="text-[11px] text-brand-neon-green leading-tight font-mono italic">
                "{responseSummary}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel: Rivalry Simulator */}
        <div className="lg:col-span-7 space-y-6 flex flex-col">
          
          <div className="glass rounded-xl p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-neon-purple flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-neon-purple animate-pulse" />
                Legendary Match Rivalry Simulator
              </h2>
              
              {/* Simulator Selectors */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-2 font-mono">Team A</label>
                  <select 
                    value={teamA} 
                    onChange={(e) => setTeamA(e.target.value)}
                    className="w-full bg-black/60 border border-brand-neon-purple/20 rounded px-2 py-2 text-xs focus:outline-none"
                  >
                    <option value="Brazil">Brazil</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Germany">Germany</option>
                    <option value="England">England</option>
                    <option value="France">France</option>
                  </select>
                </div>

                <div className="text-center font-heading font-extrabold text-brand-neon-red text-sm">VS</div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-2 font-mono">Team B</label>
                  <select 
                    value={teamB} 
                    onChange={(e) => setTeamB(e.target.value)}
                    className="w-full bg-black/60 border border-brand-neon-purple/20 rounded px-2 py-2 text-xs focus:outline-none"
                  >
                    <option value="Argentina">Argentina</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Germany">Germany</option>
                    <option value="England">England</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </div>

              {/* Bias Selector */}
              <div>
                <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-2 font-mono">Commentator Fan Loyalty</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input 
                      type="radio" 
                      name="bias" 
                      checked={biasTeam === teamA} 
                      onChange={() => setBiasTeam(teamA)}
                    />
                    <span>Loyal to {teamA}</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input 
                      type="radio" 
                      name="bias" 
                      checked={biasTeam === teamB} 
                      onChange={() => setBiasTeam(teamB)}
                    />
                    <span>Loyal to {teamB}</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSimulate}
                disabled={loadingSim}
                className="w-full py-3 bg-brand-neon-purple/20 hover:bg-brand-neon-purple/30 border border-brand-neon-purple/50 hover:border-brand-neon-purple text-brand-neon-purple text-xs font-semibold rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>{loadingSim ? 'Generating Commentary stream...' : 'Simulate Rivalry Match'}</span>
              </button>
            </div>

            {/* Commentary Output Screen */}
            <div className="mt-8 border-t border-brand-neon-purple/10 pt-6">
              <span className="text-[10px] uppercase text-white/40 tracking-wider font-mono block mb-2">
                Live Obessed Fan Commentary Stream
              </span>
              
              <div className="bg-black/50 border border-brand-neon-purple/20 p-4 rounded-lg min-h-[100px] text-left">
                <p className="text-xs text-white leading-relaxed font-mono">
                  {simulatedCommentary}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Historical Board */}
      <footer className="mt-8 glass rounded-xl p-6 text-left">
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-neon-purple mb-4 flex items-center gap-2">
          <Flag className="w-4 h-4 text-brand-neon-red" />
          Historic World Cup Passion Matches
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-black/40 border border-white/5 rounded-lg text-xs">
            <span className="font-bold text-white font-mono block">1986: Argentina 2 - 1 England</span>
            <p className="text-white/40 text-[10px] mt-1 font-light">
              Maradona scoring both the "Hand of God" and the "Goal of the Century". Pure rivalry drama.
            </p>
          </div>
          <div className="p-3 bg-black/40 border border-white/5 rounded-lg text-xs">
            <span className="font-bold text-white font-mono block">1970: Brazil 4 - 1 Italy</span>
            <p className="text-white/40 text-[10px] mt-1 font-light">
              Pele cements his legacy in a match showing off the absolute joy and obsession of samba football.
            </p>
          </div>
          <div className="p-3 bg-black/40 border border-white/5 rounded-lg text-xs">
            <span className="font-bold text-white font-mono block">2014: Germany 7 - 1 Brazil</span>
            <p className="text-white/40 text-[10px] mt-1 font-light">
              One of the most emotional, shocking matches in sports history. Pure heartbreak and fan obsession.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
