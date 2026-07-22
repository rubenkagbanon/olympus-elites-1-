/* ============================================================
   OLYMPUS ELITES — Footer Component
   Dark Arena design
   ============================================================ */
import { Link } from "wouter";
import { Instagram, Youtube, Facebook } from "lucide-react";
import logo from "@assets/logo olympus elites.jpeg";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="Olympus Elites" className="w-8 h-8 rounded-sm object-cover" />
              <span className="font-bold text-foreground tracking-widest uppercase text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Olympus <span className="text-primary">Elites</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Plateforme inter-établissements d'excellence en Côte d'Ivoire — Édition 2026
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={16} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Youtube size={16} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={16} /></a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold text-foreground mb-3 tracking-wider uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>Plateforme</h4>
            <div className="space-y-2">
              {[
                { href: "/live", label: "Live Center" },
                { href: "/inscription", label: "Inscription" },
                { href: "/bureau", label: "Bureau des 5" },
                { href: "/maillots", label: "Maillots" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="block text-xs text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold text-foreground mb-3 tracking-wider uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>Ressources</h4>
            <div className="space-y-2">
              {[
                { href: "/formation", label: "Formation Logique" },
                { href: "/formation", label: "Quiz CRACK" },
                { href: "/orientation", label: "Universités" },
                { href: "/orientation", label: "Bourses" },
              ].map((l, i) => (
                <Link key={i} href={l.href} className="block text-xs text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-foreground mb-3 tracking-wider uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>Contact</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>contact@olympuselites.ci</p>
              <p>+225 07 XX XX XX XX</p>
              <p>Abidjan, Côte d'Ivoire</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2026 Olympus Elites. Tous droits réservés.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="hover:text-primary transition-colors cursor-pointer">Mentions légales</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Confidentialité</span>
            <span className="hover:text-primary transition-colors cursor-pointer">CGU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
