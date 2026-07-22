/* ============================================================
   OLYMPUS ELITES — Maillots (Jersey Customization) Page
   Interactive jersey configurator with color picker and preview
   ============================================================ */
import Layout from "@/components/Layout";
import { useState } from "react";
import { motion } from "framer-motion";
import { Shirt, Download, Check, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const colorOptions = [
  { name: "Orange", hex: "#E8720C" },
  { name: "Marine", hex: "#1a2744" },
  { name: "Blanc", hex: "#F8F8F8" },
  { name: "Noir", hex: "#111111" },
  { name: "Rouge", hex: "#C0392B" },
  { name: "Vert", hex: "#27AE60" },
  { name: "Bleu", hex: "#2980B9" },
  { name: "Jaune", hex: "#F1C40F" },
  { name: "Violet", hex: "#8E44AD" },
  { name: "Gris", hex: "#7F8C8D" },
];

const jerseyPatterns = [
  { id: "solid", name: "Uni" },
  { id: "stripes-v", name: "Rayures verticales" },
  { id: "stripes-h", name: "Rayures horizontales" },
  { id: "diagonal", name: "Diagonal" },
];

type Player = { name: string; number: string; size: string };

export default function Maillots() {
  const [primaryColor, setPrimaryColor] = useState("#E8720C");
  const [secondaryColor, setSecondaryColor] = useState("#1a2744");
  const [pattern, setPattern] = useState("solid");
  const [schoolName, setSchoolName] = useState("Lycée Moderne Abidjan");
  const [players, setPlayers] = useState<Player[]>([
    { name: "Konan Aya", number: "10", size: "M" },
    { name: "Traoré Moussa", number: "1", size: "L" },
  ]);
  const [activeTab, setActiveTab] = useState<"maillot" | "short" | "joueurs">("maillot");

  const addPlayer = () => {
    setPlayers([...players, { name: "", number: "", size: "M" }]);
  };

  const removePlayer = (i: number) => {
    setPlayers(players.filter((_, idx) => idx !== i));
  };

  const updatePlayer = (i: number, field: keyof Player, value: string) => {
    const updated = [...players];
    updated[i] = { ...updated[i], [field]: value };
    setPlayers(updated);
  };

  const handleSubmit = () => {
    toast.success("Commande de maillots soumise ! Vous recevrez une confirmation par email.");
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="section-label mb-2">Module 3 / Maillots</div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Personnalisation des maillots
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Configurez les tenues officielles de votre établissement — inclus dans les 150 000 FCFA
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Preview */}
          <div className="space-y-4">
            {/* Jersey SVG Preview */}
            <div className="card-arena">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>Aperçu</h3>
                <div className="flex gap-1">
                  {(["maillot", "short"] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`px-3 py-1 rounded text-xs font-medium tracking-wider uppercase transition-all ${
                        activeTab === t
                          ? "bg-primary/20 text-primary border border-primary/40"
                          : "text-muted-foreground border border-border hover:border-primary/30"
                      }`}
                      style={{ fontFamily: 'Oswald, sans-serif' }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Jersey SVG */}
              <div className="flex justify-center py-8">
                <motion.div
                  key={`${primaryColor}-${secondaryColor}-${pattern}`}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "maillot" ? (
                    <JerseySVG
                      primary={primaryColor}
                      secondary={secondaryColor}
                      pattern={pattern}
                      schoolName={schoolName}
                    />
                  ) : (
                    <ShortSVG primary={primaryColor} secondary={secondaryColor} />
                  )}
                </motion.div>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                Aperçu non contractuel — rendu final peut varier
              </div>
            </div>

            {/* Order summary */}
            <div className="card-arena">
              <h3 className="font-bold text-foreground mb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>Récapitulatif commande</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Couleur principale</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-border" style={{ background: primaryColor }} />
                    <span className="font-mono text-xs text-foreground">{primaryColor}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Couleur secondaire</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-border" style={{ background: secondaryColor }} />
                    <span className="font-mono text-xs text-foreground">{secondaryColor}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Motif</span>
                  <span className="text-foreground">{jerseyPatterns.find(p => p.id === pattern)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Joueurs configurés</span>
                  <span className="text-foreground font-mono">{players.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Configuration */}
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex gap-1 bg-card rounded p-1">
              {(["maillot", "short", "joueurs"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`flex-1 py-2 rounded text-xs font-medium tracking-wider uppercase transition-all ${
                    activeTab === t
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  {t === "joueurs" ? "Joueurs" : t}
                </button>
              ))}
            </div>

            {(activeTab === "maillot" || activeTab === "short") && (
              <div className="space-y-4">
                {/* Primary color */}
                <div className="card-arena">
                  <label className="block text-xs text-muted-foreground mb-3 font-mono uppercase tracking-wider">
                    Couleur principale
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map(c => (
                      <button
                        key={c.hex}
                        onClick={() => setPrimaryColor(c.hex)}
                        title={c.name}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          primaryColor === c.hex ? "border-white scale-110" : "border-transparent hover:scale-105"
                        }`}
                        style={{ background: c.hex }}
                      >
                        {primaryColor === c.hex && (
                          <Check size={12} className="mx-auto" style={{ color: c.hex === "#F8F8F8" || c.hex === "#F1C40F" ? "#111" : "#fff" }} />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={e => setPrimaryColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs text-muted-foreground">Couleur personnalisée</span>
                  </div>
                </div>

                {/* Secondary color */}
                <div className="card-arena">
                  <label className="block text-xs text-muted-foreground mb-3 font-mono uppercase tracking-wider">
                    Couleur secondaire
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map(c => (
                      <button
                        key={c.hex}
                        onClick={() => setSecondaryColor(c.hex)}
                        title={c.name}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          secondaryColor === c.hex ? "border-white scale-110" : "border-transparent hover:scale-105"
                        }`}
                        style={{ background: c.hex }}
                      >
                        {secondaryColor === c.hex && (
                          <Check size={12} className="mx-auto" style={{ color: c.hex === "#F8F8F8" || c.hex === "#F1C40F" ? "#111" : "#fff" }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pattern */}
                <div className="card-arena">
                  <label className="block text-xs text-muted-foreground mb-3 font-mono uppercase tracking-wider">
                    Motif
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {jerseyPatterns.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setPattern(p.id)}
                        className={`py-2 px-3 rounded text-xs font-medium tracking-wider uppercase transition-all ${
                          pattern === p.id
                            ? "bg-primary/20 text-primary border border-primary/40"
                            : "bg-card text-muted-foreground border border-border hover:border-primary/30"
                        }`}
                        style={{ fontFamily: 'Oswald, sans-serif' }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* School name */}
                <div className="card-arena">
                  <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                    Nom sur le maillot
                  </label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={e => setSchoolName(e.target.value)}
                    maxLength={20}
                    className="w-full bg-input border border-border rounded px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <div className="text-xs text-muted-foreground mt-1 text-right">{schoolName.length}/20</div>
                </div>
              </div>
            )}

            {activeTab === "joueurs" && (
              <div className="space-y-3">
                <div className="card-arena">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      Liste des joueurs ({players.length})
                    </h3>
                    <button onClick={addPlayer} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
                      <Plus size={12} /> Ajouter
                    </button>
                  </div>
                  <div className="space-y-3">
                    {players.map((player, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-background/50 rounded border border-border/50">
                        <span className="text-xs text-muted-foreground font-mono w-5 shrink-0">{i + 1}</span>
                        <input
                          type="text"
                          placeholder="Nom du joueur"
                          value={player.name}
                          onChange={e => updatePlayer(i, "name", e.target.value)}
                          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
                        />
                        <input
                          type="text"
                          placeholder="N°"
                          value={player.number}
                          onChange={e => updatePlayer(i, "number", e.target.value)}
                          className="w-10 bg-transparent text-sm text-center text-foreground placeholder:text-muted-foreground focus:outline-none"
                        />
                        <select
                          value={player.size}
                          onChange={e => updatePlayer(i, "size", e.target.value)}
                          className="bg-card border border-border rounded px-1 py-0.5 text-xs text-foreground focus:outline-none"
                        >
                          {["XS", "S", "M", "L", "XL", "XXL"].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <button onClick={() => removePlayer(i)} className="text-muted-foreground hover:text-red-400 transition-colors shrink-0">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button onClick={handleSubmit} className="btn-arena w-full flex items-center justify-center gap-2">
              <Shirt size={16} />
              Valider la commande de maillots
            </button>
            <button
              onClick={() => toast.info("Export CSV disponible après validation de la commande")}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              <Download size={14} />
              Exporter CSV production
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function JerseySVG({ primary, secondary, pattern, schoolName }: {
  primary: string; secondary: string; pattern: string; schoolName: string;
}) {
  const getPatternDef = () => {
    if (pattern === "stripes-v") {
      return (
        <defs>
          <pattern id="stripes" x="0" y="0" width="20" height="100%" patternUnits="userSpaceOnUse">
            <rect width="10" height="100%" fill={primary} />
            <rect x="10" width="10" height="100%" fill={secondary} />
          </pattern>
        </defs>
      );
    }
    if (pattern === "stripes-h") {
      return (
        <defs>
          <pattern id="stripes" x="0" y="0" width="100%" height="20" patternUnits="userSpaceOnUse">
            <rect width="100%" height="10" fill={primary} />
            <rect y="10" width="100%" height="10" fill={secondary} />
          </pattern>
        </defs>
      );
    }
    return null;
  };

  const bodyFill = pattern === "solid" ? primary : pattern === "diagonal" ? `url(#diag)` : "url(#stripes)";

  return (
    <svg width="200" height="240" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {getPatternDef()}
      {pattern === "diagonal" && (
        <defs>
          <linearGradient id="diag" x1="0" y1="0" x2="1" y2="1">
            <stop offset="50%" stopColor={primary} />
            <stop offset="50%" stopColor={secondary} />
          </linearGradient>
        </defs>
      )}
      {/* Jersey body */}
      <path d="M55 30 L20 70 L40 80 L40 220 L160 220 L160 80 L180 70 L145 30 L120 50 C110 60 90 60 80 50 Z" fill={bodyFill} stroke={secondary} strokeWidth="2" />
      {/* Collar */}
      <path d="M80 50 C90 60 110 60 120 50 L115 35 C110 45 90 45 85 35 Z" fill={secondary} />
      {/* Left sleeve */}
      <path d="M55 30 L20 70 L40 80 L55 55 Z" fill={secondary} />
      {/* Right sleeve */}
      <path d="M145 30 L180 70 L160 80 L145 55 Z" fill={secondary} />
      {/* Number */}
      <text x="100" y="145" textAnchor="middle" fontSize="42" fontWeight="bold" fontFamily="Oswald, sans-serif" fill={secondary} opacity="0.9">10</text>
      {/* School name */}
      <text x="100" y="175" textAnchor="middle" fontSize="9" fontFamily="Oswald, sans-serif" fill={secondary} opacity="0.8" letterSpacing="1">
        {schoolName.toUpperCase().substring(0, 18)}
      </text>
      {/* OE logo placeholder */}
      <rect x="82" y="75" width="18" height="18" rx="2" fill={secondary} opacity="0.6" />
      <text x="91" y="88" textAnchor="middle" fontSize="8" fontWeight="bold" fontFamily="Oswald, sans-serif" fill={primary}>OE</text>
    </svg>
  );
}

function ShortSVG({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Short body */}
      <path d="M20 20 L160 20 L150 150 L100 150 L90 100 L80 150 L30 150 Z" fill={primary} stroke={secondary} strokeWidth="2" />
      {/* Waistband */}
      <rect x="20" y="20" width="140" height="15" rx="2" fill={secondary} />
      {/* Center seam */}
      <line x1="90" y1="35" x2="90" y2="150" stroke={secondary} strokeWidth="2" opacity="0.5" />
      {/* Side stripes */}
      <rect x="20" y="35" width="8" height="100" fill={secondary} opacity="0.6" />
      <rect x="152" y="35" width="8" height="100" fill={secondary} opacity="0.6" />
    </svg>
  );
}
