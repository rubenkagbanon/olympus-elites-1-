/* ============================================================
   OLYMPUS ELITES — Inscription Page
   Multi-step registration form + payment methods
   ============================================================ */
import Layout from "@/components/Layout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, School, Users, CreditCard, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const steps = [
  { id: 1, label: "Établissement", icon: School },
  { id: 2, label: "Équipes", icon: Users },
  { id: 3, label: "Paiement", icon: CreditCard },
  { id: 4, label: "Confirmation", icon: CheckCircle },
];

const paymentMethods = [
  { id: "orange", label: "Orange Money", logo: "🟠", desc: "Paiement via Orange Money CI" },
  { id: "mtn", label: "MTN MoMo", logo: "🟡", desc: "Paiement via MTN Mobile Money" },
  { id: "moov", label: "Moov Money", logo: "🔵", desc: "Paiement via Moov Money" },
  { id: "virement", label: "Virement bancaire", logo: "🏦", desc: "Virement vers compte Olympus Elites" },
  { id: "cheque", label: "Chèque", logo: "📄", desc: "Chèque à l'ordre de Olympus Elites" },
];

export default function Inscription() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("orange");
  const [schoolType, setSchoolType] = useState("public");
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setStep(4);
    toast.success("Inscription soumise avec succès !");
  };

  return (
    <Layout>
      <div className="container py-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="section-label mb-2">Module 1 / Inscription</div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Inscrire mon établissement
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Frais d'inscription : <span className="text-primary font-mono font-bold">150 000 FCFA</span> — Maillots officiels inclus
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center flex-1">
                <div className={`flex flex-col items-center gap-1 ${i < steps.length - 1 ? "flex-1" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isDone ? "bg-primary text-primary-foreground" :
                    isActive ? "bg-primary/20 border-2 border-primary text-primary" :
                    "bg-card border border-border text-muted-foreground"
                  }`}>
                    {isDone ? <Check size={14} /> : <Icon size={14} />}
                  </div>
                  <span className={`text-[9px] tracking-wider uppercase whitespace-nowrap ${isActive ? "text-primary" : "text-muted-foreground"}`} style={{ fontFamily: 'Oswald, sans-serif' }}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-2 mb-4 ${isDone ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <div className="space-y-4">
                <div className="card-arena">
                  <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>Informations de l'établissement</h3>
                  <div className="space-y-3">
                    <FormField label="Nom de l'établissement" placeholder="Ex: Lycée Moderne d'Abidjan" required />
                    <FormField label="Adresse complète" placeholder="Quartier, Commune, Ville" required />
                    <FormField label="Ville" placeholder="Abidjan, Bouaké, Yamoussoukro..." required />
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Téléphone" placeholder="+225 07 XX XX XX XX" required />
                      <FormField label="Email" placeholder="direction@lycee.ci" type="email" required />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">Type d'établissement</label>
                      <div className="flex gap-2">
                        {["public", "privé"].map(t => (
                          <button
                            key={t}
                            onClick={() => setSchoolType(t)}
                            className={`flex-1 py-2 rounded text-xs font-medium tracking-wider uppercase transition-all ${
                              schoolType === t
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
                    <FormField label="Nombre d'élèves" placeholder="Ex: 850" type="number" required />
                  </div>
                </div>
                <div className="card-arena">
                  <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>Responsable de l'inscription</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Prénom" placeholder="Jean" required />
                      <FormField label="Nom" placeholder="Kouassi" required />
                    </div>
                    <FormField label="Fonction" placeholder="Directeur, Proviseur..." required />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="card-arena">
                  <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>Disciplines choisies</h3>
                  <p className="text-xs text-muted-foreground mb-4">Sélectionnez les disciplines auxquelles votre établissement participera.</p>
                  <div className="space-y-3">
                    {[
                      { name: "Football", icon: "⚽", players: "11 joueurs + 3 remplaçants" },
                      { name: "Basketball", icon: "🏀", players: "5 joueurs + 2 remplaçants" },
                      { name: "Intellectuel", icon: "🧠", players: "4 participants" },
                      { name: "Gymnastique", icon: "🤸", players: "Individuel" },
                    ].map(d => (
                      <label key={d.name} className="flex items-center gap-3 p-3 rounded border border-border hover:border-primary/30 cursor-pointer transition-all">
                        <input type="checkbox" className="w-4 h-4 accent-orange-500" defaultChecked={d.name === "Football"} />
                        <span className="text-xl">{d.icon}</span>
                        <div>
                          <div className="font-semibold text-foreground text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>{d.name}</div>
                          <div className="text-xs text-muted-foreground">{d.players}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="card-arena">
                  <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>Bureau des 5</h3>
                  <p className="text-xs text-muted-foreground mb-4">Les 5 membres élus qui géreront votre espace établissement.</p>
                  <div className="space-y-3">
                    {["Président", "Secrétaire", "Responsable Sport", "Responsable Intellectuel", "Responsable Communication"].map(role => (
                      <div key={role} className="flex items-center gap-3">
                        <div className="w-24 text-xs text-muted-foreground shrink-0">{role}</div>
                        <input
                          type="text"
                          placeholder={`Nom du ${role}`}
                          className="flex-1 bg-input border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="card-arena">
                  <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>Récapitulatif</h3>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Inscription établissement</span>
                    <span className="font-mono font-bold text-foreground">130 000 FCFA</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Maillots officiels (inclus)</span>
                    <span className="font-mono text-muted-foreground">20 000 FCFA</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>Total</span>
                    <span className="font-mono font-bold text-primary text-lg">150 000 FCFA</span>
                  </div>
                </div>

                <div className="card-arena">
                  <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>Mode de paiement</h3>
                  <div className="space-y-2">
                    {paymentMethods.map(pm => (
                      <label
                        key={pm.id}
                        className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-all ${
                          paymentMethod === pm.id
                            ? "border-primary/50 bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={pm.id}
                          checked={paymentMethod === pm.id}
                          onChange={() => setPaymentMethod(pm.id)}
                          className="accent-orange-500"
                        />
                        <span className="text-xl">{pm.logo}</span>
                        <div>
                          <div className="font-semibold text-foreground text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>{pm.label}</div>
                          <div className="text-xs text-muted-foreground">{pm.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {(paymentMethod === "orange" || paymentMethod === "mtn" || paymentMethod === "moov") && (
                    <div className="mt-4 p-3 bg-card rounded border border-border">
                      <FormField label="Numéro de téléphone Mobile Money" placeholder="+225 07 XX XX XX XX" required />
                      <p className="text-xs text-muted-foreground mt-2">
                        Vous recevrez une demande de confirmation sur ce numéro.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle size={40} className="text-primary" />
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Inscription soumise !
                </h2>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Votre demande d'inscription a été reçue. Vous recevrez une confirmation par SMS et email après validation du paiement.
                </p>
                <div className="card-arena text-left max-w-xs mx-auto mb-6">
                  <div className="text-xs text-muted-foreground mb-1 font-mono">Numéro de dossier</div>
                  <div className="font-mono font-bold text-primary text-lg">OE-2026-{Math.floor(Math.random() * 9000) + 1000}</div>
                  <div className="text-xs text-muted-foreground mt-2">Statut : <span className="badge-upcoming">En attente de paiement</span></div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {step < 4 && (
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                Retour
              </button>
            )}
            <button
              onClick={step === 3 ? handleSubmit : handleNext}
              className="btn-arena flex-1 flex items-center justify-center gap-2"
            >
              {step === 3 ? "Soumettre l'inscription" : "Continuer"}
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

function FormField({ label, placeholder, type = "text", required = false }: {
  label: string; placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-1.5 font-mono uppercase tracking-wider">
        {label}{required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-input border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
      />
    </div>
  );
}
