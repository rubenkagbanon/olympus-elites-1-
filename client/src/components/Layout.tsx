/* ============================================================
   OLYMPUS ELITES — Layout Component
   Dark Arena: sticky top nav + mobile bottom tab bar
   ============================================================ */
import { Link, useLocation } from "wouter";
import { Home, Zap, UserCheck, BookOpen, GraduationCap, Instagram, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import Footer from "./Footer";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import logo from "@assets/logo olympus elites.jpeg";

const navItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/live", label: "Live Center", icon: Zap },
  { href: "/formation", label: "Formation", icon: BookOpen },
  { href: "/orientation", label: "Orientation", icon: GraduationCap },
  { href: "/social", label: "Social Wall", icon: Instagram },
];

const mobileNavItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/live", label: "Live", icon: Zap },
  { href: "/bureau", label: "Bureau", icon: UserCheck },
  { href: "/formation", label: "Formation", icon: BookOpen },
  { href: "/orientation", label: "Orientation", icon: GraduationCap },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Olympus Elites" className="w-8 h-8 rounded-sm object-cover" />
            <span className="hidden sm:block font-bold text-foreground text-sm tracking-widest uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Olympus <span className="text-primary">Elites</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded text-xs font-medium tracking-wider uppercase transition-all ${
                    active
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserMenu />
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded text-muted-foreground hover:text-foreground"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-md">
            <div className="container py-3 flex flex-col gap-1">
              {[...navItems, { href: "/inscription", label: "S'inscrire", icon: UserCheck }, { href: "/bureau", label: "Bureau des 5", icon: UserCheck }, { href: "/maillots", label: "Maillots", icon: UserCheck }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2.5 rounded text-sm font-medium tracking-wide transition-all ${
                    location === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>

      <Footer />

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {mobileNavItems.map((item) => {
            const active = location === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded transition-all ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2.5 : 1.5} />
                <span className="text-[9px] tracking-wider uppercase font-medium" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  if (!toggleTheme) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
      title={theme === "dark" ? "Mode clair" : "Mode sombre"}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

function UserMenu() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!user) {
    return (
      <div className="hidden sm:flex items-center gap-2">
        <Link
          href="/login"
          className="px-3 py-1.5 rounded border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
          style={{ fontFamily: 'Oswald, sans-serif' }}
        >
          Connexion
        </Link>
        <Link
          href="/register"
          className="btn-arena text-xs px-4 py-2"
        >
          S'inscrire
        </Link>
      </div>
    );
  }

  return (
    <div className="relative hidden sm:block">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
      >
        <UserCheck size={13} />
        {user.name}
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-card border border-border rounded shadow-lg z-50">
          <div className="p-3 border-b border-border/50">
            <div className="text-xs text-muted-foreground">{user.email}</div>
            <div className="text-xs text-primary font-semibold mt-1">
              {user.role === "bureau" ? "Bureau des 5" : "Élève/Étudiant"} • {user.school}
            </div>
          </div>
          <Link
            href="/bureau"
            onClick={() => setDropdownOpen(false)}
            className="block px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            Tableau de bord
          </Link>
          <button
            onClick={() => {
              logout();
              setDropdownOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-1.5"
          >
            <LogOut size={12} />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
