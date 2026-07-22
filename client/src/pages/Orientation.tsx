/* ============================================================
   OLYMPUS ELITES — Orientation Page
   University directory, seminars, and scholarship tracker
   ============================================================ */
import Layout from "@/components/Layout";
import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Phone, Mail, Calendar, Award, ChevronRight, Search } from "lucide-react";
import { toast } from "sonner";

const universities = [
  {
    id: 1, name: "INPHB — Institut National Polytechnique Félix Houphouët-Boigny",
    city: "Yamoussoukro", type: "Public", filières: ["Ingénierie", "Technologie", "Sciences"],
    contact: "+225 30 64 00 00", email: "info@inphb.ci",
    bourse: true, reduction: "30%", deadline: "30 Juin 2026",
  },
  {
    id: 2, name: "UNIVERSITÉ FÉLIX HOUPHOUËT-BOIGNY",
    city: "Abidjan", type: "Public", filières: ["Droit", "Lettres", "Sciences", "Médecine"],
    contact: "+225 22 44 90 00", email: "contact@ufhb.edu.ci",
    bourse: true, reduction: "25%", deadline: "15 Juil 2026",
  },
  {
    id: 3, name: "UNIVERSITÉ NANGUI ABROGOUA",
    city: "Abidjan", type: "Public", filières: ["Sciences & Technologies", "Environnement"],
    contact: "+225 21 35 40 00", email: "info@una.edu.ci",
    bourse: false, reduction: "", deadline: "",
  },
  {
    id: 4, name: "ESATIC — École Supérieure Africaine des TIC",
    city: "Abidjan", type: "Public", filières: ["Informatique", "Télécommunications", "Cybersécurité"],
    contact: "+225 27 22 52 55 00", email: "contact@esatic.ci",
    bourse: true, reduction: "40%", deadline: "01 Juil 2026",
  },
  {
    id: 5, name: "GROUPE PIGIER CÔTE D'IVOIRE",
    city: "Abidjan", type: "Privé", filières: ["Commerce", "Gestion", "Marketing", "RH"],
    contact: "+225 27 22 44 55 66", email: "info@pigier.ci",
    bourse: true, reduction: "20%", deadline: "31 Août 2026",
  },
  {
    id: 6, name: "ISTC — Institut des Sciences et Techniques de la Communication",
    city: "Abidjan", type: "Public", filières: ["Journalisme", "Communication", "Audiovisuel"],
    contact: "+225 27 22 41 00 00", email: "contact@istc.ci",
    bourse: false, reduction: "", deadline: "",
  },
];

const seminars = [
  {
    id: 1, title: "Séminaire d'Orientation Post-Bac — Session 1",
    date: "14 Juin 2026", time: "09h00 - 17h00",
    location: "Palais de la Culture, Abidjan",
    spots: 200, registered: 142,
    topics: ["Présentation des filières", "Témoignages d'étudiants", "Procédures d'inscription"],
  },
  {
    id: 2, title: "Séminaire Bourses & Financement des Études",
    date: "12 Septembre 2026", time: "09h00 - 16h00",
    location: "INPHB, Yamoussoukro",
    spots: 150, registered: 67,
    topics: ["Bourses nationales", "Bourses partenaires Olympus", "Financement alternatif"],
  },
];

const scholarships = [
  { school: "Lycée Moderne Abidjan", student: "Coulibaly Fatou", university: "ESATIC", reduction: "40%", status: "Accordée" },
  { school: "Collège Saint-Viateur", student: "Traoré Moussa", university: "INPHB", reduction: "30%", status: "Accordée" },
  { school: "Lycée Technique Bouaké", student: "Bamba Seydou", university: "UFHB", reduction: "25%", status: "En cours" },
  { school: "Lycée Classique Abidjan", student: "Konan Aya", university: "Groupe Pigier", reduction: "20%", status: "Accordée" },
];

export default function Orientation() {
  const [activeTab, setActiveTab] = useState<"universites" | "seminaires" | "bourses">("universites");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"Tous" | "Public" | "Privé">("Tous");

  const filtered = universities.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase()) ||
      u.filières.some(f => f.toLowerCase().includes(search.toLowerCase()));
    const matchType = filterType === "Tous" || u.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="section-label mb-2">Module 6 / Orientation</div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Orientation & Universités
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Annuaire des partenaires, séminaires d'orientation et suivi des bourses
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-card rounded p-1">
          {([
            { id: "universites", label: "Universités" },
            { id: "seminaires", label: "Séminaires" },
            { id: "bourses", label: "Bourses" },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded text-xs font-medium tracking-wider uppercase transition-all ${
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

        {activeTab === "universites" && (
          <div>
            {/* Search & filter */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher université, filière, ville..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-card border border-border rounded pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div className="flex gap-1">
                {(["Tous", "Public", "Privé"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`px-3 py-2 rounded text-xs font-medium tracking-wider uppercase transition-all ${
                      filterType === t
                        ? "bg-primary/20 text-primary border border-primary/40"
                        : "bg-card text-muted-foreground border border-border hover:border-primary/30"
                    }`}
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((uni, i) => (
                <motion.div
                  key={uni.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-arena"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-primary/10 rounded">
                      <GraduationCap size={16} className="text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono uppercase ${uni.type === "Public" ? "text-teal-400" : "text-yellow-400"}`}>
                        {uni.type}
                      </span>
                      {uni.bourse && (
                        <span className="badge-live text-[9px]">
                          <Award size={8} /> Bourse {uni.reduction}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-1 leading-snug" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    {uni.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <MapPin size={10} /> {uni.city}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {uni.filières.map(f => (
                      <span key={f} className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-muted-foreground border border-border/50">
                        {f}
                      </span>
                    ))}
                  </div>
                  {uni.bourse && (
                    <div className="text-xs text-muted-foreground mb-3">
                      Dépôt dossier avant le <span className="text-primary font-mono">{uni.deadline}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Phone size={10} /> {uni.contact}</span>
                  </div>
                  <button
                    onClick={() => toast.info(`Fiche complète de ${uni.name} — fonctionnalité disponible`)}
                    className="mt-3 flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    Voir la fiche complète <ChevronRight size={12} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "seminaires" && (
          <div className="space-y-4 max-w-2xl mx-auto">
            {seminars.map((sem, i) => (
              <motion.div
                key={sem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-arena"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-foreground text-base mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {sem.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {sem.date} · {sem.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin size={11} /> {sem.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-primary">{sem.registered}/{sem.spots}</div>
                    <div className="text-[10px] text-muted-foreground">inscrits</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="h-1.5 bg-border rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(sem.registered / sem.spots) * 100}%` }}
                  />
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {sem.topics.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-muted-foreground border border-border/50">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => toast.success(`Inscription au séminaire "${sem.title}" enregistrée !`)}
                  className="btn-arena text-xs px-4 py-2 flex items-center gap-1.5"
                >
                  <Calendar size={13} /> S'inscrire au séminaire
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "bourses" && (
          <div className="max-w-2xl mx-auto">
            <div className="card-arena mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Award size={16} className="text-primary" />
                <h3 className="font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Tableau des bourses accordées — Édition 2026
                </h3>
              </div>
              <div className="rounded overflow-hidden border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-card border-b border-border">
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground font-mono uppercase tracking-wider">Élève</th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground font-mono uppercase tracking-wider hidden sm:table-cell">École</th>
                      <th className="text-left px-4 py-3 text-xs text-muted-foreground font-mono uppercase tracking-wider hidden md:table-cell">Université</th>
                      <th className="text-center px-3 py-3 text-xs text-muted-foreground font-mono uppercase tracking-wider">Réduction</th>
                      <th className="text-center px-3 py-3 text-xs text-muted-foreground font-mono uppercase tracking-wider">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scholarships.map((s, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                        <td className="px-4 py-3 font-semibold text-foreground text-sm">{s.student}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">{s.school}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">{s.university}</td>
                        <td className="px-3 py-3 text-center font-mono font-bold text-primary">{s.reduction}</td>
                        <td className="px-3 py-3 text-center">
                          {s.status === "Accordée" ? (
                            <span className="badge-live text-[10px]">✓ {s.status}</span>
                          ) : (
                            <span className="badge-upcoming text-[10px]">{s.status}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Bourses accordées", value: "32", color: "text-primary" },
                { label: "Réduction moyenne", value: "29%", color: "text-teal-400" },
                { label: "Universités partenaires", value: "6", color: "text-yellow-400" },
              ].map(s => (
                <div key={s.label} className="card-arena text-center">
                  <div className={`font-mono font-bold text-2xl mb-1 ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
