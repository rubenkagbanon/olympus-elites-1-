/* ============================================================
   OLYMPUS ELITES — Register Page
   Multi-step registration: role selection, school, credentials, bureau code
   ============================================================ */
import Layout from "@/components/Layout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Building2, Code, Eye, EyeOff, ChevronRight, ChevronLeft, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type Step = "role" | "school" | "credentials" | "bureau" | "confirm";

const schools = [
  "Lycée Moderne Abidjan",
  "Collège Saint-Viateur",
  "Lycée Technique Bouaké",
  "Lycée Classique Abidjan",
  "Lycée Municipal Daloa",
  "Lycée Sainte-Marie Abidjan",
  "Collège Moderne Yamoussoukro",
  "Lycée Scientifique Gagnoa",
];

export default function Register() {
  const { register } = useAuth();
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<"lambda" | "bureau" | null>(null);
  const [school, setSchool] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bureauCode, setBureauCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNext = () => {
    setError("");
    if (step === "role" && !role) {
      setError("Sélectionnez votre rôle");
      return;
    }
    if (step === "school" && !school) {
      setError("Sélectionnez votre établissement");
      return;
    }
    if (step === "credentials") {
      if (!name || !email || !password) {
        setError("Tous les champs sont requis");
        return;
      }
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }
      if (password.length < 6) {
        setError("Le mot de passe doit contenir au moins 6 caractères");
        return;
      }
    }
    if (step === "bureau" && role === "bureau") {
      if (!bureauCode || bureauCode.length < 6) {
        setError("Code Bureau des 5 invalide (minimum 6 caractères)");
        return;
      }
    }

    const steps: Step[] = ["role", "school", "credentials", "bureau", "confirm"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ["role", "school", "credentials", "bureau", "confirm"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      await register({
        email,
        password,
        name,
        school,
        role: role!,
        bureauCode: role === "bureau" ? bureauCode : undefined,
      });
      toast.success("Inscription réussie ! Bienvenue sur Olympus Elites");
      // Redirect will be handled by router
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de l'inscription";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Créer un compte
            </h1>
            <p className="text-muted-foreground text-sm">
              Rejoignez la plateforme Olympus Elites
            </p>
            {/* Progress */}
            <div className="flex gap-1 mt-4">
              {(["role", "school", "credentials", "bureau", "confirm"] as const).map((s, i) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    ["role", "school", "credentials", "bureau", "confirm"].indexOf(step) >= i
                      ? "bg-primary"
                      : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Role Selection */}
            {step === "role" && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground mb-4">Quel est votre rôle ?</p>
                <button
                  onClick={() => setRole("lambda")}
                  className={`w-full p-4 rounded border-2 transition-all text-left ${
                    role === "lambda"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-foreground mb-1">Élève / Étudiant</div>
                  <div className="text-xs text-muted-foreground">Accès aux modules publics</div>
                </button>
                <button
                  onClick={() => setRole("bureau")}
                  className={`w-full p-4 rounded border-2 transition-all text-left ${
                    role === "bureau"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-foreground mb-1">Membre du Bureau des 5</div>
                  <div className="text-xs text-muted-foreground">Gestion de l'établissement</div>
                </button>
              </motion.div>
            )}

            {/* Step 2: School Selection */}
            {step === "school" && (
              <motion.div
                key="school"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <label className="block text-xs text-muted-foreground mb-3 font-mono uppercase tracking-wider">
                  Votre établissement
                </label>
                <select
                  value={school}
                  onChange={e => setSchool(e.target.value)}
                  className="w-full bg-card border border-border rounded px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="">-- Sélectionnez --</option>
                  {schools.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* Step 3: Credentials */}
            {step === "credentials" && (
              <motion.div
                key="credentials"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {/* Name */}
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Votre nom"
                      className="w-full bg-card border border-border rounded pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full bg-card border border-border rounded pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-card border border-border rounded pl-9 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-card border border-border rounded pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Bureau Code (if bureau member) */}
            {step === "bureau" && role === "bureau" && (
              <motion.div
                key="bureau"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="p-4 rounded bg-primary/5 border border-primary/20 mb-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Votre établissement vous a fourni un code d'accès spécial pour les membres du Bureau des 5. Entrez-le ci-dessous.
                  </p>
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                    Code Bureau des 5
                  </label>
                  <div className="relative">
                    <Code size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={bureauCode}
                      onChange={e => setBureauCode(e.target.value.toUpperCase())}
                      placeholder="Ex: BUREAU2026"
                      className="w-full bg-card border border-border rounded pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors font-mono tracking-widest"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Code minimum 6 caractères
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 5: Confirmation */}
            {step === "confirm" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    Vérifiez vos informations
                  </h3>
                </div>

                <div className="space-y-3 bg-card rounded p-4 border border-border/50">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Rôle</span>
                    <span className="text-sm font-semibold text-foreground">
                      {role === "lambda" ? "Élève / Étudiant" : "Bureau des 5"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Établissement</span>
                    <span className="text-sm font-semibold text-foreground">{school}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Nom</span>
                    <span className="text-sm font-semibold text-foreground">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Email</span>
                    <span className="text-sm font-semibold text-foreground">{email}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  En créant un compte, vous acceptez nos conditions d'utilisation.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded bg-red-500/10 border border-red-500/30 mt-4">
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <span className="text-xs text-red-400">{error}</span>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-6">
            {step !== "role" && (
              <button
                onClick={handleBack}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                <ChevronLeft size={14} />
                Retour
              </button>
            )}
            {step !== "confirm" ? (
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-1.5 btn-arena"
              >
                Suivant
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 btn-arena disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Création en cours..." : "Créer mon compte"}
              </button>
            )}
          </div>

          {/* Login link */}
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground mb-2">
              Vous avez déjà un compte ?
            </p>
            <Link
              href="/login"
              className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Se connecter
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
