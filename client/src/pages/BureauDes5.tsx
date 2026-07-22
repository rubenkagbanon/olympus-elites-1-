/* ============================================================
   OLYMPUS ELITES — Bureau des 5 Dashboard
   Private school dashboard: team management, scores, tracking
   ============================================================ */
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Users, Trophy, BookOpen, Shirt, BarChart3, Plus, Edit2, Check, X, Star, Shield } from "lucide-react";
import { toast } from "sonner";

const bureauMembers = [
  { role: "Président", name: "Konan Aya Marie", avatar: "KA" },
  { role: "Secrétaire", name: "Traoré Moussa", avatar: "TM" },
  { role: "Resp. Sport", name: "Bamba Seydou", avatar: "BS" },
  { role: "Resp. Intellectuel", name: "Coulibaly Fatou", avatar: "CF" },
  { role: "Resp. Communication", name: "Diallo Ibrahim", avatar: "DI" },
];

const teams = [
  { discipline: "Football", icon: "⚽", registered: 11, max: 14, status: "complet" },
  { discipline: "Basketball", icon: "🏀", registered: 5, max: 7, status: "complet" },
  { discipline: "Intellectuel", icon: "🧠", registered: 4, max: 4, status: "complet" },
  { discipline: "Gymnastique", icon: "🤸", registered: 2, max: 4, status: "incomplet" },
];

const results = [
  { date: "18 Avr", opponent: "Lycée Technique Bouaké", score: "2 - 1", discipline: "Football", result: "V" },
  { date: "15 Avr", opponent: "Collège Saint-Viateur", score: "45 - 38", discipline: "Intellectuel", result: "V" },
  { date: "12 Avr", opponent: "Lycée Classique Abidjan", score: "1 - 2", discipline: "Football", result: "D" },
  { date: "10 Avr", opponent: "Lycée Municipal Daloa", score: "78 - 65", discipline: "Basketball", result: "V" },
];

const stats = [
  { label: "Matchs joués", value: "12", icon: Trophy, color: "text-orange-400" },
  { label: "Victoires", value: "9", icon: Star, color: "text-yellow-400" },
  { label: "Points logique", value: "420", icon: BookOpen, color: "text-teal-400" },
  { label: "Classement général", value: "#2", icon: BarChart3, color: "text-green-400" },
];

export default function BureauDes5() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "equipes" | "resultats" | "maillots">("dashboard");

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="section-label mb-2">Module 2 / Bureau des 5</div>
            <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Lycée Moderne Abidjan
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge-live"><span className="live-dot w-1.5 h-1.5" />Inscrit</span>
              <span className="text-xs text-muted-foreground font-mono">OE-2026-0042</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Shield size={20} className="text-primary" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-card rounded p-1 overflow-x-auto">
          {([
            { id: "dashboard", label: "Tableau de bord" },
            { id: "equipes", label: "Équipes" },
            { id: "resultats", label: "Résultats" },
            { id: "maillots", label: "Maillots" },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="card-arena"
                  >
                    <div className={`${stat.color} mb-2`}><Icon size={18} /></div>
                    <div className="score-display text-3xl mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bureau members */}
            <div className="card-arena">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>Bureau des 5</h3>
                <button
                  onClick={() => toast.info("Modification disponible après validation admin")}
                  className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                >
                  <Edit2 size={12} /> Modifier
                </button>
              </div>
              <div className="space-y-3">
                {bureauMembers.map((member) => (
                  <div key={member.role} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      {member.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent results */}
            <div className="card-arena">
              <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>Derniers résultats</h3>
              <div className="space-y-2">
                {results.slice(0, 3).map((r, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                    <span className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center shrink-0 ${
                      r.result === "V" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}>{r.result}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-foreground truncate">{r.opponent}</div>
                      <div className="text-[10px] text-muted-foreground">{r.date} · {r.discipline}</div>
                    </div>
                    <span className="font-mono text-sm text-foreground">{r.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "equipes" && (
          <div className="space-y-4">
            {teams.map((team, i) => (
              <motion.div
                key={team.discipline}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-arena"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{team.icon}</span>
                  <div>
                    <div className="font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>{team.discipline}</div>
                    <div className="text-xs text-muted-foreground">{team.registered}/{team.max} participants</div>
                  </div>
                  <div className="ml-auto">
                    {team.status === "complet" ? (
                      <span className="badge-live"><Check size={10} />Complet</span>
                    ) : (
                      <span className="badge-upcoming">Incomplet</span>
                    )}
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-border rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(team.registered / team.max) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => toast.info("Gestion des effectifs — fonctionnalité complète disponible")}
                  className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus size={12} /> Gérer les effectifs
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "resultats" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>Historique des résultats</h3>
              <button
                onClick={() => toast.info("Saisie de résultats — réservée aux admins")}
                className="btn-arena text-xs px-3 py-1.5 flex items-center gap-1.5"
              >
                <Plus size={12} /> Saisir résultat
              </button>
            </div>
            {results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-arena flex items-center gap-4"
              >
                <span className={`w-8 h-8 rounded text-sm font-bold flex items-center justify-center shrink-0 ${
                  r.result === "V" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}>{r.result}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground">{r.opponent}</div>
                  <div className="text-xs text-muted-foreground">{r.date} · {r.discipline}</div>
                </div>
                <div className="score-display text-xl">{r.score}</div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "maillots" && (
          <div className="card-arena text-center py-10">
            <Shirt size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Personnalisation des maillots
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
              Accédez au module de personnalisation 3D pour configurer les maillots officiels de votre établissement.
            </p>
            <a href="/maillots" className="btn-arena inline-flex items-center gap-2">
              <Shirt size={16} />
              Personnaliser les maillots
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}
