/* ============================================================
   OLYMPUS ELITES — Formation en Logique Page
   PDF library + Quiz CRACK with timer + progression tracking
   ============================================================ */
import Layout from "@/components/Layout";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Download, Clock, Trophy, ChevronRight, CheckCircle, XCircle, BarChart3, Zap } from "lucide-react";
import { toast } from "sonner";

const pdfs = [
  { id: 1, title: "Logique déductive — Bases", date: "01 Avr 2026", pages: 12, size: "1.2 MB", level: "Débutant" },
  { id: 2, title: "Syllogismes & raisonnement", date: "15 Mar 2026", pages: 18, size: "1.8 MB", level: "Intermédiaire" },
  { id: 3, title: "Logique propositionnelle", date: "01 Mar 2026", pages: 24, size: "2.1 MB", level: "Avancé" },
  { id: 4, title: "Analogies et séries", date: "15 Fév 2026", pages: 15, size: "1.4 MB", level: "Intermédiaire" },
  { id: 5, title: "Puzzles logiques — Niveau 1", date: "01 Fév 2026", pages: 20, size: "1.9 MB", level: "Débutant" },
  { id: 6, title: "Raisonnement mathématique", date: "15 Jan 2026", pages: 22, size: "2.3 MB", level: "Avancé" },
];

const quizQuestions = [
  {
    id: 1,
    question: "Si tous les A sont B, et tous les B sont C, alors :",
    options: ["Tous les C sont A", "Tous les A sont C", "Certains C sont A", "Aucune de ces réponses"],
    correct: 1,
    explanation: "Par transitivité : A→B et B→C implique A→C. Donc tous les A sont C."
  },
  {
    id: 2,
    question: "Quelle est la prochaine valeur dans la suite : 2, 6, 12, 20, 30, ?",
    options: ["38", "40", "42", "44"],
    correct: 2,
    explanation: "La différence augmente de 2 à chaque fois : +4, +6, +8, +10, +12. Donc 30 + 12 = 42."
  },
  {
    id: 3,
    question: "Marie est plus grande que Sophie. Sophie est plus grande que Léa. Qui est la plus petite ?",
    options: ["Marie", "Sophie", "Léa", "Impossible à déterminer"],
    correct: 2,
    explanation: "Marie > Sophie > Léa. Donc Léa est la plus petite."
  },
  {
    id: 4,
    question: "Un train part à 8h00 et arrive à 11h30. S'il s'arrête 45 minutes en route, combien de temps roule-t-il ?",
    options: ["2h45", "2h30", "3h00", "3h15"],
    correct: 0,
    explanation: "Durée totale : 3h30. Moins 45 min d'arrêt = 2h45 de trajet effectif."
  },
  {
    id: 5,
    question: "Si CHAT = 3-8-1-20, alors LION = ?",
    options: ["12-9-15-14", "11-9-15-14", "12-8-15-14", "12-9-14-15"],
    correct: 0,
    explanation: "C=3, H=8, A=1, T=20 correspond aux positions dans l'alphabet. L=12, I=9, O=15, N=14."
  },
];

export default function Formation() {
  const [activeTab, setActiveTab] = useState<"bibliotheque" | "quiz" | "progression">("bibliotheque");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (quizStarted && !answered && !quizDone) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            handleAnswer(null);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [quizStarted, currentQ, answered, quizDone]);

  const handleAnswer = (idx: number | null) => {
    if (answered) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelected(idx);
    setAnswered(true);
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (idx === quizQuestions[currentQ].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= quizQuestions.length) {
      setQuizDone(true);
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(30);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setQuizDone(false);
    setTimeLeft(30);
    setAnswers([]);
  };

  const levelColor = (level: string) => {
    if (level === "Débutant") return "text-green-400";
    if (level === "Intermédiaire") return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="section-label mb-2">Module 5 / Formation</div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Formation en Logique
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Supports bimensuels & Quiz CRACK chronométré
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-card rounded p-1">
          {([
            { id: "bibliotheque", label: "Bibliothèque", icon: BookOpen },
            { id: "quiz", label: "Quiz CRACK", icon: Zap },
            { id: "progression", label: "Progression", icon: BarChart3 },
          ] as const).map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium tracking-wider uppercase transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                <Icon size={13} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bibliothèque */}
        {activeTab === "bibliotheque" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pdfs.map((pdf, i) => (
              <motion.div
                key={pdf.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-arena group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-primary/10 rounded">
                    <BookOpen size={18} className="text-primary" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase ${levelColor(pdf.level)}`}>{pdf.level}</span>
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>{pdf.title}</h3>
                <div className="text-xs text-muted-foreground mb-4">
                  {pdf.date} · {pdf.pages} pages · {pdf.size}
                </div>
                <button
                  onClick={() => toast.success(`Téléchargement de "${pdf.title}" — optimisé pour 3G`)}
                  className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  <Download size={12} /> Télécharger PDF
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quiz CRACK */}
        {activeTab === "quiz" && (
          <div className="max-w-lg mx-auto">
            {!quizStarted && !quizDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-arena text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                  <Zap size={28} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Quiz CRACK
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  {quizQuestions.length} questions · 30 secondes par question · Correction automatique
                </p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Questions", value: quizQuestions.length },
                    { label: "Temps/Q", value: "30s" },
                    { label: "Difficulté", value: "Moyen" },
                  ].map(s => (
                    <div key={s.label} className="bg-card rounded p-3">
                      <div className="font-mono font-bold text-primary text-lg">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setQuizStarted(true)} className="btn-arena flex items-center gap-2 mx-auto">
                  <Zap size={16} /> Commencer le quiz
                </button>
              </motion.div>
            )}

            {quizStarted && !quizDone && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Timer bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground font-mono">
                        Question {currentQ + 1}/{quizQuestions.length}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className={timeLeft <= 10 ? "text-red-400" : "text-muted-foreground"} />
                        <span className={`font-mono font-bold text-sm ${timeLeft <= 10 ? "text-red-400" : "text-foreground"}`}>
                          {timeLeft}s
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: timeLeft <= 10 ? "#ef4444" : "var(--orange)" }}
                        animate={{ width: `${(timeLeft / 30) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="card-arena mb-4">
                    <p className="text-foreground font-semibold text-base leading-relaxed">
                      {quizQuestions[currentQ].question}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    {quizQuestions[currentQ].options.map((opt, i) => {
                      let cls = "border-border text-foreground hover:border-primary/40";
                      if (answered) {
                        if (i === quizQuestions[currentQ].correct) cls = "border-green-500/60 bg-green-500/10 text-green-400";
                        else if (i === selected) cls = "border-red-500/60 bg-red-500/10 text-red-400";
                        else cls = "border-border text-muted-foreground opacity-50";
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          disabled={answered}
                          className={`w-full text-left p-3 rounded border transition-all text-sm flex items-center gap-3 ${cls}`}
                        >
                          <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-mono shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                          {answered && i === quizQuestions[currentQ].correct && <CheckCircle size={14} className="ml-auto text-green-400" />}
                          {answered && i === selected && i !== quizQuestions[currentQ].correct && <XCircle size={14} className="ml-auto text-red-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card-arena mb-4 border-l-primary"
                    >
                      <div className="text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider">Explication</div>
                      <p className="text-sm text-foreground">{quizQuestions[currentQ].explanation}</p>
                    </motion.div>
                  )}

                  {answered && (
                    <button onClick={nextQuestion} className="btn-arena w-full flex items-center justify-center gap-2">
                      {currentQ + 1 >= quizQuestions.length ? "Voir les résultats" : "Question suivante"}
                      <ChevronRight size={16} />
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {quizDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-arena text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                  <Trophy size={28} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Quiz terminé !
                </h2>
                <div className="score-display text-5xl mb-2">{score}/{quizQuestions.length}</div>
                <p className="text-muted-foreground text-sm mb-6">
                  {score === quizQuestions.length ? "Score parfait ! 🏆" :
                   score >= quizQuestions.length * 0.7 ? "Excellent résultat ! 🎉" :
                   score >= quizQuestions.length * 0.5 ? "Bon travail, continuez ! 💪" :
                   "Révisez les supports et réessayez ! 📚"}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-card rounded p-3">
                    <div className="text-green-400 font-mono font-bold text-xl">{score}</div>
                    <div className="text-xs text-muted-foreground">Bonnes réponses</div>
                  </div>
                  <div className="bg-card rounded p-3">
                    <div className="text-red-400 font-mono font-bold text-xl">{quizQuestions.length - score}</div>
                    <div className="text-xs text-muted-foreground">Mauvaises réponses</div>
                  </div>
                </div>
                <button onClick={resetQuiz} className="btn-arena flex items-center gap-2 mx-auto">
                  <Zap size={16} /> Recommencer
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Progression */}
        {activeTab === "progression" && (
          <div className="space-y-4 max-w-lg mx-auto">
            <div className="card-arena">
              <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>Ma progression</h3>
              <div className="space-y-4">
                {[
                  { label: "Logique déductive", progress: 85, color: "bg-primary" },
                  { label: "Syllogismes", progress: 70, color: "bg-teal-500" },
                  { label: "Séries & analogies", progress: 55, color: "bg-yellow-500" },
                  { label: "Logique mathématique", progress: 40, color: "bg-blue-500" },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm text-foreground">{item.label}</span>
                      <span className="text-xs font-mono text-primary">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-arena">
              <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>Classement logique — École</h3>
              <div className="space-y-2">
                {[
                  { rank: 1, name: "Coulibaly Fatou", score: 420, badge: "🥇" },
                  { rank: 2, name: "Traoré Moussa", score: 385, badge: "🥈" },
                  { rank: 3, name: "Konan Aya", score: 360, badge: "🥉" },
                  { rank: 4, name: "Bamba Seydou", score: 310, badge: "" },
                  { rank: 5, name: "Diallo Ibrahim", score: 280, badge: "" },
                ].map(p => (
                  <div key={p.rank} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                    <span className="text-lg w-6 text-center">{p.badge || p.rank}</span>
                    <span className="flex-1 text-sm text-foreground">{p.name}</span>
                    <span className="font-mono font-bold text-primary text-sm">{p.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
