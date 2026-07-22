/* ============================================================
   OLYMPUS ELITES — Home Page
   Dark Arena design: hero, stats, modules, disciplines
   ============================================================ */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Zap, Trophy, Users, BookOpen, GraduationCap, Shirt, Instagram, ChevronRight, Calendar, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroBg from "@assets/Home images de touts les competitions.png";
import basketballImg from "@assets/Basket.png";
import gymnasticsImg from "@assets/gymnstique.png";
import handballImg from "@assets/Handball.png";
import artistiqueImg from "@assets/Artistique.png";

const HERO_BG = heroBg;
const FOOTBALL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663587578055/oATxMahjrmZ2XWWBHUw2Hy/football-action-NVPX2MvcEde5MayPqcUaU4.webp";
const INTELLECTUAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663587578055/oATxMahjrmZ2XWWBHUw2Hy/intellectual-competition-aGDiABPM5giuHZZQUUaZTN.webp";
const GYMNASTICS_IMG = gymnasticsImg;
const TROPHY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663587578055/oATxMahjrmZ2XWWBHUw2Hy/trophy-ceremony-oAZ4iWt38y8gvQ8oPbcxQ7.webp";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const modules = [
  { icon: Zap, label: "Live Center", desc: "Scores & classements en temps réel", href: "/live", color: "text-orange-400" },
  { icon: Users, label: "Bureau des 5", desc: "Gestion d'équipe par établissement", href: "/bureau", color: "text-teal-400" },
  { icon: Shirt, label: "Maillots", desc: "Personnalisation 3D des tenues", href: "/maillots", color: "text-yellow-400" },
  { icon: BookOpen, label: "Formation", desc: "Quiz CRACK & supports logique", href: "/formation", color: "text-green-400" },
  { icon: GraduationCap, label: "Orientation", desc: "Universités & bourses partenaires", href: "/orientation", color: "text-blue-400" },
  { icon: Instagram, label: "Social Wall", desc: "Fil Instagram & TikTok officiel", href: "/social", color: "text-pink-400" },
];

const disciplines = [
  { name: "Football", format: "6v6 · 11 inscrits", icon: "⚽", img: FOOTBALL_IMG },
  { name: "Basketball", format: "5 contre 5 · 5 inscrits", icon: "🏀", img: basketballImg },
  { name: "Handball (Filles)", format: "5 contre 5 · filles uniquement", icon: "🤾", img: handballImg },
  { name: "Intellectuel", format: "Équipe de 4 élèves", icon: "🧠", img: INTELLECTUAL_IMG },
  { name: "Gymnastique", format: "Individuel", icon: "🤸", img: GYMNASTICS_IMG },
  { name: "Art", format: "Individuel", icon: "🎨", img: artistiqueImg },
];

const liveMatches = [
  { home: "Lycée Moderne Abidjan", away: "Lycée Technique Bouaké", scoreHome: 2, scoreAway: 1, discipline: "Football", status: "live" },
  { home: "Collège Saint-Viateur", away: "Lycée Classique Abidjan", scoreHome: 45, scoreAway: 38, discipline: "Intellectuel", status: "live" },
  { home: "Lycée Municipal Daloa", away: "Lycée Sainte-Marie", scoreHome: 0, scoreAway: 0, discipline: "Basketball", status: "upcoming" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Home() {
  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Arena" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="section-label mb-4"
            >
              Édition 2026 · Côte d'Ivoire
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-none mb-2"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              OLYMPUS
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-6 text-gradient-orange"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              ELITES
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg leading-relaxed"
            >
              La plateforme inter-établissements d'excellence combinant compétition sportive, épreuves intellectuelles et orientation scolaire en Côte d'Ivoire.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/inscription" className="btn-arena">
                Inscrire mon établissement
              </Link>
              <Link
                href="/live"
                className="flex items-center gap-2 px-5 py-2.5 rounded border border-border text-sm text-foreground hover:border-primary/50 hover:bg-white/5 transition-all"
                style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                <div className="live-dot" />
                Live Center
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating live match card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:block"
        >
          <div className="card-arena w-64">
            <div className="flex items-center gap-2 mb-3">
              <div className="live-dot" />
              <span className="badge-live">En direct</span>
              <span className="text-xs text-muted-foreground ml-auto">⚽ Football</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground text-center flex-1">
                <div className="text-foreground font-semibold text-sm mb-1">Lycée Moderne</div>
                <div className="text-muted-foreground text-[10px]">Abidjan</div>
              </div>
              <div className="score-display text-3xl px-4">2 – 1</div>
              <div className="text-xs text-muted-foreground text-center flex-1">
                <div className="text-foreground font-semibold text-sm mb-1">Lycée Technique</div>
                <div className="text-muted-foreground text-[10px]">Bouaké</div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-[10px] text-muted-foreground font-mono">67'</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 border-y border-border bg-card/30">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Établissements", value: 87, suffix: "+" },
              { label: "Élèves participants", value: 4200, suffix: "+" },
              { label: "Disciplines", value: 6, suffix: "" },
              { label: "Bourses accordées", value: 32, suffix: "" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="score-display text-4xl mb-1">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground tracking-wider uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE MATCHES PREVIEW ── */}
      <section className="py-14">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="section-label mb-2">01 / Live Center</div>
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Matchs en cours
              </h2>
            </div>
            <Link href="/live" className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Voir tout <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid gap-3">
            {liveMatches.map((match, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="card-arena"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {match.status === "live" ? (
                        <span className="badge-live"><span className="live-dot w-1.5 h-1.5" />{match.discipline}</span>
                      ) : (
                        <span className="badge-upcoming">{match.discipline}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-foreground truncate flex-1">{match.home}</span>
                      {match.status === "live" ? (
                        <span className="score-display text-xl whitespace-nowrap">
                          {match.scoreHome} – {match.scoreAway}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground whitespace-nowrap font-mono">À venir</span>
                      )}
                      <span className="text-sm font-semibold text-foreground truncate flex-1 text-right">{match.away}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCIPLINES ── */}
      <section className="py-14 bg-card/20">
        <div className="container">
          <div className="mb-8">
            <div className="section-label mb-2">02 / Disciplines</div>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
              6 disciplines, 1 championnat
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {disciplines.map((d, i) => (
              <motion.div
                key={d.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative rounded overflow-hidden group cursor-pointer"
                style={{ aspectRatio: '3/4' }}
              >
                {d.img ? (
                  <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 bg-card" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 border border-border group-hover:border-primary/50 rounded transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-2xl mb-1">{d.icon}</div>
                  <div className="text-lg font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.format}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES GRID ── */}
      <section className="py-14">
        <div className="container">
          <div className="mb-8">
            <div className="section-label mb-2">03 / Plateforme</div>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Tous les modules
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <motion.div key={mod.label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Link href={mod.href} className="card-arena flex items-start gap-4 group block hover:no-underline">
                    <div className={`p-2.5 rounded bg-white/5 ${mod.color} group-hover:bg-white/10 transition-colors`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>{mod.label}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{mod.desc}</div>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TROPHY CTA ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={TROPHY_IMG} alt="Trophy" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label justify-center mb-4">04 / Inscription</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Rejoignez le championnat<br />
              <span className="text-gradient-orange">Olympus Elites 2026</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Inscription ouverte pour tous les établissements de Côte d'Ivoire. Frais d'inscription : 150 000 FCFA incluant les maillots officiels.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/inscription" className="btn-arena">
                Inscrire mon établissement
              </Link>
              <Link
                href="/maillots"
                className="flex items-center gap-2 px-5 py-2.5 rounded border border-border text-sm text-foreground hover:border-primary/50 hover:bg-white/5 transition-all"
                style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                <Shirt size={15} />
                Personnaliser les maillots
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PLANNING ── */}
      <section className="py-14 bg-card/20">
        <div className="container">
          <div className="mb-8">
            <div className="section-label mb-2">05 / Calendrier</div>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Plan 90 jours
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { period: "Semaines 1-4", phase: "Cadrage & Maquettes", status: "done", icon: "✅" },
              { period: "Semaines 5-8", phase: "Développement & Modules", status: "live", icon: "🔥" },
              { period: "Semaines 9-12", phase: "Tests & UAT", status: "upcoming", icon: "🧪" },
              { period: "Septembre", phase: "Lancement Officiel", status: "upcoming", icon: "🚀" },
            ].map((phase, i) => (
              <motion.div
                key={phase.period}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="card-arena"
              >
                <div className="text-2xl mb-3">{phase.icon}</div>
                <div className="text-xs text-muted-foreground mb-1 font-mono">{phase.period}</div>
                <div className="font-bold text-foreground text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>{phase.phase}</div>
                <div className="mt-3">
                  {phase.status === "done" && <span className="badge-done">Terminé</span>}
                  {phase.status === "live" && <span className="badge-live"><span className="live-dot w-1.5 h-1.5" />En cours</span>}
                  {phase.status === "upcoming" && <span className="badge-upcoming">À venir</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
