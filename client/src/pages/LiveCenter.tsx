/* ============================================================
   OLYMPUS ELITES — Live Center Page
   Dark Arena: real-time scores, rankings, match calendar
   ============================================================ */
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Zap, Trophy, Calendar, Filter } from "lucide-react";

type Discipline = "Tous" | "Football" | "Basketball" | "Intellectuel" | "Gymnastique";

const disciplines: Discipline[] = ["Tous", "Football", "Basketball", "Intellectuel", "Gymnastique"];

const matches = [
  { id: 1, home: "Lycée Moderne Abidjan", away: "Lycée Technique Bouaké", scoreHome: 2, scoreAway: 1, discipline: "Football", status: "live", time: "67'" },
  { id: 2, home: "Collège Saint-Viateur", away: "Lycée Classique Abidjan", scoreHome: 45, scoreAway: 38, discipline: "Intellectuel", status: "live", time: "Q3" },
  { id: 3, home: "Lycée Municipal Daloa", away: "Lycée Sainte-Marie", scoreHome: 0, scoreAway: 0, discipline: "Basketball", status: "upcoming", time: "15:30" },
  { id: 4, home: "Lycée Scientifique Abidjan", away: "Collège Notre-Dame", scoreHome: 0, scoreAway: 0, discipline: "Football", status: "upcoming", time: "16:00" },
  { id: 5, home: "Lycée Technique Yamoussoukro", away: "Lycée Moderne Korhogo", scoreHome: 3, scoreAway: 1, discipline: "Football", status: "done", time: "FT" },
  { id: 6, home: "Collège Sainte-Famille", away: "Lycée Municipal Abidjan", scoreHome: 62, scoreAway: 58, discipline: "Intellectuel", status: "done", time: "FIN" },
  { id: 7, home: "Lycée Classique Bouaké", away: "Lycée Technique Daloa", scoreHome: 78, scoreAway: 65, discipline: "Basketball", status: "done", time: "FT" },
  { id: 8, home: "Lycée Moderne San-Pédro", away: "Collège Catholique Abidjan", scoreHome: 0, scoreAway: 0, discipline: "Gymnastique", status: "upcoming", time: "17:00" },
];

const rankings = [
  { rank: 1, school: "Lycée Moderne Abidjan", pts: 18, played: 6, won: 6, lost: 0, discipline: "Football" },
  { rank: 2, school: "Lycée Technique Bouaké", pts: 15, played: 6, won: 5, lost: 1, discipline: "Football" },
  { rank: 3, school: "Collège Saint-Viateur", pts: 12, played: 6, won: 4, lost: 2, discipline: "Football" },
  { rank: 4, school: "Lycée Classique Abidjan", pts: 9, played: 6, won: 3, lost: 3, discipline: "Football" },
  { rank: 5, school: "Lycée Municipal Daloa", pts: 6, played: 6, won: 2, lost: 4, discipline: "Football" },
  { rank: 6, school: "Lycée Scientifique Abidjan", pts: 3, played: 6, won: 1, lost: 5, discipline: "Football" },
];

const intellectualRankings = [
  { rank: 1, school: "Collège Saint-Viateur", pts: 420, played: 5, won: 5, lost: 0, discipline: "Intellectuel" },
  { rank: 2, school: "Lycée Classique Abidjan", pts: 385, played: 5, won: 4, lost: 1, discipline: "Intellectuel" },
  { rank: 3, school: "Collège Notre-Dame", pts: 350, played: 5, won: 3, lost: 2, discipline: "Intellectuel" },
  { rank: 4, school: "Lycée Moderne Abidjan", pts: 310, played: 5, won: 2, lost: 3, discipline: "Intellectuel" },
];

export default function LiveCenter() {
  const [activeDisc, setActiveDisc] = useState<Discipline>("Tous");
  const [activeTab, setActiveTab] = useState<"matches" | "classement">("matches");

  const filteredMatches = activeDisc === "Tous"
    ? matches
    : matches.filter(m => m.discipline === activeDisc);

  const liveCount = matches.filter(m => m.status === "live").length;

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="section-label mb-2">01 / Live Center</div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Live Center
            </h1>
            {liveCount > 0 && (
              <span className="badge-live">
                <span className="live-dot w-1.5 h-1.5" />
                {liveCount} en direct
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Scores et classements en temps réel — Édition 2026
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-card rounded p-1 w-fit">
          {(["matches", "classement"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded text-xs font-medium tracking-wider uppercase transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              {tab === "matches" ? "Matchs" : "Classement"}
            </button>
          ))}
        </div>

        {/* Discipline filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {disciplines.map(d => (
            <button
              key={d}
              onClick={() => setActiveDisc(d)}
              className={`px-3 py-1.5 rounded text-xs whitespace-nowrap font-medium tracking-wider uppercase transition-all ${
                activeDisc === d
                  ? "bg-primary/20 text-primary border border-primary/40"
                  : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground"
              }`}
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              {d}
            </button>
          ))}
        </div>

        {activeTab === "matches" && (
          <div className="space-y-3">
            {/* Live matches first */}
            {filteredMatches.filter(m => m.status === "live").length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="live-dot" />
                  <span className="text-xs text-primary font-mono uppercase tracking-wider">En direct</span>
                </div>
                {filteredMatches.filter(m => m.status === "live").map((match, i) => (
                  <MatchCard key={match.id} match={match} index={i} />
                ))}
              </div>
            )}

            {/* Upcoming */}
            {filteredMatches.filter(m => m.status === "upcoming").length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">À venir</span>
                </div>
                {filteredMatches.filter(m => m.status === "upcoming").map((match, i) => (
                  <MatchCard key={match.id} match={match} index={i} />
                ))}
              </div>
            )}

            {/* Done */}
            {filteredMatches.filter(m => m.status === "done").length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Terminés</span>
                </div>
                {filteredMatches.filter(m => m.status === "done").map((match, i) => (
                  <MatchCard key={match.id} match={match} index={i} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "classement" && (
          <div className="space-y-8">
            <RankingTable title="Football — Classement général" data={rankings} />
            <RankingTable title="Intellectuel — Classement général" data={intellectualRankings} scoreLabel="Points" />
          </div>
        )}
      </div>
    </Layout>
  );
}

function MatchCard({ match, index }: { match: typeof matches[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card-arena mb-3"
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            {match.status === "live" ? (
              <span className="badge-live"><span className="live-dot w-1.5 h-1.5" />{match.discipline}</span>
            ) : match.status === "upcoming" ? (
              <span className="badge-upcoming">{match.discipline}</span>
            ) : (
              <span className="badge-done">{match.discipline}</span>
            )}
            <span className="text-xs text-muted-foreground font-mono ml-auto">{match.time}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-foreground truncate">{match.home}</div>
            </div>
            {match.status !== "upcoming" ? (
              <div className="score-display text-2xl whitespace-nowrap px-3">
                {match.scoreHome} – {match.scoreAway}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground font-mono whitespace-nowrap px-3">VS</div>
            )}
            <div className="flex-1 min-w-0 text-right">
              <div className="text-sm font-semibold text-foreground truncate">{match.away}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RankingTable({ title, data, scoreLabel = "Pts" }: { title: string; data: typeof rankings; scoreLabel?: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={16} className="text-primary" />
        <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>{title}</h3>
      </div>
      <div className="rounded overflow-hidden border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-card border-b border-border">
              <th className="text-left px-4 py-3 text-xs text-muted-foreground font-mono uppercase tracking-wider w-10">#</th>
              <th className="text-left px-4 py-3 text-xs text-muted-foreground font-mono uppercase tracking-wider">Établissement</th>
              <th className="text-center px-3 py-3 text-xs text-muted-foreground font-mono uppercase tracking-wider">J</th>
              <th className="text-center px-3 py-3 text-xs text-muted-foreground font-mono uppercase tracking-wider">V</th>
              <th className="text-center px-3 py-3 text-xs text-muted-foreground font-mono uppercase tracking-wider">D</th>
              <th className="text-center px-3 py-3 text-xs text-muted-foreground font-mono uppercase tracking-wider">{scoreLabel}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row.rank}
                className={`border-b border-border/50 transition-colors hover:bg-white/3 ${i === 0 ? "bg-primary/5" : ""}`}
              >
                <td className="px-4 py-3">
                  <span className={`font-mono font-bold text-sm ${i === 0 ? "text-primary" : i === 1 ? "text-yellow-400" : i === 2 ? "text-orange-400" : "text-muted-foreground"}`}>
                    {row.rank}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-foreground text-sm">{row.school}</span>
                </td>
                <td className="px-3 py-3 text-center text-muted-foreground font-mono text-xs">{row.played}</td>
                <td className="px-3 py-3 text-center text-green-400 font-mono text-xs">{row.won}</td>
                <td className="px-3 py-3 text-center text-red-400 font-mono text-xs">{row.lost}</td>
                <td className="px-3 py-3 text-center font-bold text-primary font-mono">{row.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
